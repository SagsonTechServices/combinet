const mongoose  = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
