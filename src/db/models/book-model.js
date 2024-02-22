const mongoose = require('mongoose');
const BookSchema = require('../schemas/book-schema');

exports.Book = mongoose.model('Book', BookSchema);