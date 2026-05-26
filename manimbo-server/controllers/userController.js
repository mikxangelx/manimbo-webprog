const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const isBcryptHash = (value) =>
  typeof value === 'string' && /^\$2[aby]\$\d{2}\$/.test(value);

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
let seededUsers = null;

const getSeededUser = (email) => {
  if (!seededUsers) {
    try {
      seededUsers = JSON.parse(fs.readFileSync(USERS_JSON, 'utf-8'));
    } catch (_) {
      seededUsers = [];
    }
  }

  return seededUsers.find(
    (entry) => String(entry.email || '').trim().toLowerCase() === email
  );
};

const getValidRole = (value) => {
  const role = String(value || '').toLowerCase();
  return ROLES.includes(role) ? role : '';
};

const getDuplicateUserMessage = (error) => {
  if (error?.code !== 11000) return '';

  const duplicatedField = Object.keys(error.keyPattern || error.keyValue || {})[0];

  if (duplicatedField === 'email') {
    return 'Email address is already registered.';
  }

  if (duplicatedField === 'username') {
    return 'Username is already taken.';
  }

  return 'Account already exists.';
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (error) {
    const duplicateMessage = getDuplicateUserMessage(error);
    if (duplicateMessage) {
      return res.status(409).json({ message: duplicateMessage });
    }

    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    const duplicateMessage = getDuplicateUserMessage(error);
    if (duplicateMessage) {
      return res.status(409).json({ message: duplicateMessage });
    }

    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: String(email || '').toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: 'Your account is inactive. Please contact support.' });
    }

    const storedPassword = String(user.password || '');
    let isPasswordValid = false;

    if (isBcryptHash(storedPassword)) {
      isPasswordValid = await bcrypt.compare(password, storedPassword);
    } else {
      isPasswordValid = password === storedPassword;
      if (isPasswordValid) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const seededUser = getSeededUser(user.email);
    const seededRole = getValidRole(seededUser?.role || seededUser?.type);
    const loginType = seededRole || getValidRole(user.type) || 'viewer';

    if (user.type !== loginType) {
      user.type = loginType;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, type: loginType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      type: loginType,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
