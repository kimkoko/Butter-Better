const mongoose = require('mongoose');
const CategorySchema = require('../schemas/category-schema')

exports.Category = mongoose.model('Category', CategorySchema)