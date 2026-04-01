const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is needed"], 
        trim: true 
    },
    content: {
        type: String,
        required: [true, "Must contain content"] 
    },
    author: {
        type: String,
        default: 'Anonymous'
    }
 }, { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);