const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const { body, validationResult, query } = require('express-validator');

//Get all posts with pagination
exports.getPosts = async (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const skip = (page - 1) * limit;
    const total = await Post.count();
    const posts = await Post.find()
        .populate('author', 'name')
        .populate('category', 'name')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit);
    res.json({ posts, total, page, pages: Math.ceil(total/limit) });
};

//Get single post with image upload
exports.createPost = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            let imageName = 'default-post.jpg';
            if (req.files?.featuredImage) {
                const file = req.files.featuredImage;
                imageName = Date.now() + path.extname(file.name);
                file.mv(`uploads/${imageName}`);
            }
            const post = await Post.create({
                ...req.body,
                author: req.user._id,
                featuredImage: imageName,
            });
            res.status(201).json(post);
        } catch (err) { next(err); }
    }
];

exports.updatePost = [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('content').optional().notEmpty().withMessage('Content is required'),
    body('category').optional().notEmpty().withMessage('Category is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found'});

            //Update image if new one is uploaded
            if (req.files?.featuredImage) {
                const fs = require('fs');
                const path = require('path');

                //Delete old image if not default
                if (post.featuredImage !== 'default-post.jpg') {
                    fs.unlinkSync(path.join(__dirname, '..', 'uploads', post.featuredImage));
                } 

                const file = req.files.featuredImage;
                const imageName = Date.now() + path.extname(file.name);
                file.mv(`uploads/${imageName}`);
                post.featuredImage = imageName;
            }

            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content;
            post.category = req.body.category || post.category;

            await post.save();
            res.json(post);
        } catch (err) { next(err); }
    }
];

exports.searchPosts = async (req, res, next) => {
    try {
        const q = req.query.q || '';
        const posts = await Post.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } }
            ]
        }).populate('author', 'name').populate('category', 'name');
        res.json(posts);
    } catch (err) { next(err); }
};

exports.getComments = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments.user', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post.comments);
    } catch (err) { next(err); }
};

exports.addComment = [
    body('content').notEmpty().withMessage('Content is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            await post.addComment(req.user._id, req.body.content);
            res.status(201).json({ message: 'Comment added' });
        } catch (err) { next(err); }
    }
];
