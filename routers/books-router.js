const { Router } = require('express');
const { Post } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();
 
  // 상품 목록 조회
  router.get('/books', asyncHandler(async(req, res) => {
    try {
      const books = await Book.find();
      res.send(books);
    } catch (error) {
      res.status(500).send(error);
    }
    const page = Number(req.query.page|| 1);
    const perPage = Number(req.query.perPage|| 10);



  }));
  // 상품 상세 조회
  router.get('/books/:id', async (req, res) => {
    const _id = req.params.id;
  
    try {
      const book = await Book.findById(_id);
      if (!book) {
        return res.status(404).send();
      }
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  // 상품 추가
router.post('/books', async (req, res) => {
    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).send(book);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  //상품삭제
  router.delete('/books/admin',asyncHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
  
      if (!book) {
        return res.status(404).send();
      }
  
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }));
  //상품 수정
  router.patch('/books/admin', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'category_name', 'price', 'content', 'img_url', 'is_sale', 'quantity', 'rate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  
      if (!book) {
        return res.status(404).send();
      }
  
      res.send(book);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  // 상품 페이지네이션
  router.get('/books/:id', async (req, res) => {
    const _id = req.params.id;
  
    try {
      const book = await Book.findById(_id);
      if (!book) {
        return res.status(404).send();
      }
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
module.exports = router;
