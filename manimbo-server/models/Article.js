const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    content: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Article || mongoose.model('Article', articleSchema);
