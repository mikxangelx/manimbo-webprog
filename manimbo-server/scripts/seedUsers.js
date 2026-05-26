require('dotenv').config();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const USERS_JSON = path.resolve(
  __dirname,
  '..',
  '..',
  'manimbo-client',
  'src',
  'data',
  'users.json'
);

const ROLES = ['admin', 'editor', 'viewer'];

const normalize = (raw) => {
  const type = ROLES.includes(String(raw.role || raw.type || '').toLowerCase())
    ? String(raw.role || raw.type).toLowerCase()
    : 'viewer';

  return {
    firstName: String(raw.firstName || '').trim(),
    lastName: String(raw.lastName || '').trim(),
    age: String(raw.age || '').trim(),
    gender: String(raw.gender || '').trim().toLowerCase(),
    contactNumber: String(raw.contactNumber || '').trim(),
    email: String(raw.email || '').trim().toLowerCase(),
    type,
    username: String(raw.username || '').trim().toLowerCase(),
    password: String(raw.password || ''),
    address: String(raw.address || '').trim(),
    isActive:
      typeof raw.isActive === 'boolean' ? raw.isActive : true,
  };
};

const run = async () => {
  if (!fs.existsSync(USERS_JSON)) {
    console.error(`Seed file not found: ${USERS_JSON}`);
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);

  const raw = JSON.parse(fs.readFileSync(USERS_JSON, 'utf-8'));
  console.log(`Found ${raw.length} users in seed file.`);

  let created = 0;
  let updated = 0;

  for (const entry of raw) {
    const user = normalize(entry);
    if (!user.email || !user.password) {
      console.warn(`Skipping user with missing email/password: ${user.username}`);
      continue;
    }

    const hashed = await bcrypt.hash(user.password, 10);
    const result = await User.findOneAndUpdate(
      { email: user.email },
      { ...user, password: hashed },
      { new: true, upsert: true, setDefaultsOnInsert: true, rawResult: true }
    );

    if (result.lastErrorObject && result.lastErrorObject.updatedExisting) {
      updated += 1;
      console.log(`  updated  ${user.email}  (${user.type})`);
    } else {
      created += 1;
      console.log(`  created  ${user.email}  (${user.type})`);
    }
  }

  console.log('');
  console.log(`Done. Created ${created}, updated ${updated}.`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch(async (err) => {
  console.error('Seed failed:', err.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
