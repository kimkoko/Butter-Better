const { Book } = require('../db/models/bookModel');

class BookService {
    
    async getBestSellers() {
        const bestSellers = await Book.find({ isBestSeller: true })
          .populate('category_id');
        return bestSellers;
      }

  async getBooks(page = 1, perPage = 24) {
    const skip = (page - 1) * perPage;
    const total = await Book.countDocuments({});
    const books = await Book.find({})
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
    const book = await Book.findById(id).populate('category_id');
    return book;
  }

  async addBook(bookData) {
    const newBook = await Book.create(bookData);
    return newBook;
  }

  async deleteBook(id) {
    const deletedBook = await Book.deleteOne({ _id: id });
    return deletedBook;
  }

  async updateBook(id, updateData) {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
    return updatedBook;
  }
}

module.exports = new BookService();
