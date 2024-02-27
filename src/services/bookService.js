const bookModel = require('../db/models/bookModel');

class BookService {
  async getBestSellers() {
    const bestSellers = await bookModel
      .find({ isBestSeller: true })
      .populate('category_id');
    return bestSellers;
  }

  async getBooksByCategory(categoryId, page, perPage) {
    const booksByCategory = await bookModel.findByCategory(
      categoryId,
      page,
      perPage
    );
    return booksByCategory;
  }

  async getBooks(page = 1, perPage = 24) {
    const skip = (page - 1) * perPage;
    const total = await bookModel.countDocuments({});
    const books = await bookModel
      .find({})
      .skip(skip)
      .limit(perPage)
      .populate('category_id');

    return {
      totalPage: Math.ceil(total / perPage),
      productCount: total,
      books,
    };
  }

  async getBook(id) {
    const book = await bookModel.findById(id).populate('category_id');
    return book;
  }

  async addBook(bookData) {
    const newBook = await bookModel.create(bookData);
    return newBook;
  }

  async deleteBook(id) {
    const deletedBook = await bookModel.deleteOne({ _id: id });
    return deletedBook;
  }

  async updateBook(id, updateData) {
    const updatedBook = await bookModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedBook;
  }
}

module.exports = new BookService();
