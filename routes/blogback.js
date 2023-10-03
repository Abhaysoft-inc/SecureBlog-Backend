const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodel');

router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new route for fetching blog posts by username
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const posts = await Blog.find({ author: username });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});



// Update a blog post by ID
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

 

  module.exports = router;
