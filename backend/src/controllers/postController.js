const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({createdAt:-1});
        res.status(200).json(posts);
    }catch (error) {
        next (error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const {title, content, author } = req.body;
        if (!title || !content) {
            return res.status(400).json({message: "Post need a title and content"});
        }

        const newPost = new Post ({title, content, author});
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        next (error);
    }
};

exports.deletePost = async (req, res, next) => {
    const clientPassword = req.headers['admin-secret'];

    console.log("--- INCOMING DELETE REQUEST ---");
    console.log("Secret from Header:", clientPassword);
    console.log("Secret in .env:", process.env.ADMIN_PASSWORD);

    if (clientPassword !== process.env.ADMIN_PASSWORD) {
        console.log("LOCK ENGAGED: Password mismatch!");
        return res.status(403).json({ message: "That´s not the right password" });
    }
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not located"});
        }
        res.status(200).json({message: "Post deleted!"});
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    const clientPassword = req.headers['admin-secret'];
    if (clientPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ message: "That´s not the right password, no edit here" });
    }    
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};