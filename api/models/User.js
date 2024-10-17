const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    saved: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
    created_communities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Community'}],
    joined_communities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Community'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;