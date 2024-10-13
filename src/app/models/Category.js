const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: { type: String, required: true }
});

const categorySchema = new Schema({
    name: { type: String, required: true },
    subcategories: [subCategorySchema]
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
