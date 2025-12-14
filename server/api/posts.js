const express = require('express');
const router = express.Router();
const auth = require('./auth');
const data = require('../db/data'); // подключаем data.js

// - Read -
router.get('/get-all', async (req, res) => { // Show all posts
    try {
    const posts = await data.getAllPosts();
    res.json(posts);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/get/:id', async (req, res) => { // Show post with given id
    try {
    const post = await data.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
    }
});

// - Create -
router.post('/create', auth, async (req, res) => { // Add a new post
    try {
    const post = await data.createPost(req.body.body);
    res.status(201).json(post);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
    }
});

// - Update -
router.put('/update/:id', auth, async (req, res) => { // Update post with given ID
    try {
    const post = await data.updatePost(req.params.id, req.body.body);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
    }
});

// - Delete -
router.delete('/delete/:id', auth, async (req, res) => { // Delete chosen post
    try {
    await data.deletePost(req.params.id);
    res.sendStatus(204);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting post' });
    }
});

router.delete('/delete-all', auth, async (req, res) => { // Delete all posts
    try {
    await data.deleteAllPosts();
    res.send('All posts deleted');
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting all posts' });
    }
});

module.exports = router;
