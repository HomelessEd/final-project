const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Ttile is needed"],
        trim: true 
    },
    content: {
        type: String,
        require: [true, "Must contain content"]
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);