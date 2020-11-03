const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    posts: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Post'
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
        }
    ]
});

const feed = mongoose.model('Feed', feedSchema);

module.exports = feed;