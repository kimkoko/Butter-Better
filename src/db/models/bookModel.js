const mongoose = require('mongoose');
const BookSchema = require('../schemas/bookSchema');
const Book = mongoose.model('Book', BookSchema);

class BookModel {
  async findByCategory(categoryId, page, perPage) {
    const [total, books] = await Promise.all([
      Book.countDocuments({ categoryId: categoryId }),
      Book.find({ categoryId: categoryId })
        .sort({ createdAt: -1 }) //최신순
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);

    return { books, total, totalPage };
  }
}

const bookModel = new BookModel();
module.exports = bookModel;
