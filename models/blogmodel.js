// models/blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author:{type:String},
});

module.exports = mongoose.model('Blog', blogSchema);
