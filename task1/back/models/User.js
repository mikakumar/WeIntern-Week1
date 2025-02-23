const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'Full name must be at least 3 letters long']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: String,
    username: {
        type: String,
        minlength: [3, 'Full name must be at least 3 letters long']
    }
});

module.exports = mongoose.model('User', userSchema);