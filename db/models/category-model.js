const mongoose = require('mongoose');
const categorySchema = require('../schemas/category-schema')

exports.category = mongoose.model('category', categorySchema)