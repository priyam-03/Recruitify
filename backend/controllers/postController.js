const mongoose = require('mongoose');
const Post = require('../models/posts.js');
const Userauth = require("../models/userModel.js");
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
exports.createPost = catchAsyncErrors(async (req, res) => {
    try {
        const { content, user } = req.body;
        console.log("text == " + content.texts);
        console.log("user = " + user);

        const author = await Userauth.findOne({ email: user });
        if (!author) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newPost = new Post({
            author: author._id,
            text: content.texts,
            images: content.images
        });
        const savedPost = await newPost.save();
        await Post.populate(savedPost, { path: 'author' });
        res.status(201).json(savedPost);
        console.log("successful.. + ");


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.getPost = catchAsyncErrors(async (req, res) => {
    try {
        const email = req.params.email;
        console.log("email== " + email);
        const author = await Userauth.findOne({ email: email });
        let posts;
        if (email) {
            posts = await Post.find({ 'author': author._id }).populate('author').sort({timestamp:-1});
        } else {
            posts = await Post.find().populate('author').sort({timestamp:-1});
        }

        console.log("posts == " + posts);
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Posts not found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.deletePost = catchAsyncErrors(async (req, res) => {
    try {
        const postId = req.params.id; 

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.remove();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
