const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    summary: String,
    img: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);    