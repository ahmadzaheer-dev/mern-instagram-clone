const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    image: {
        type: String,
        required: true,
        unique: true
    },

    caption: {
        type: String,
        required: true,
    },

    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ],

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            caption: {
                type: String,
                required: true
            }
        }
    ]
})

const post = mongoose.model('Post', postSchema);
module.exports = post;