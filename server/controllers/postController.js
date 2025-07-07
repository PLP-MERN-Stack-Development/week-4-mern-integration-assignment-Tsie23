const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');

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
exports.createPost = async (req, res) => {
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
};

exports.updatePost = async (req, res) => {
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
};
