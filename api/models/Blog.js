const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    category: {type: String, required: true},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    thumbnail: {type: String},
    likes: {count: {type: Number, default: 0}, likedBy: [{type: String}]},
    comments: [{text: {type: String}, commentor: {type: String}, commentedAt: {type: Date, default: Date.now}}]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;