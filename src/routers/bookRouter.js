const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const asyncHandler = require('../utils/async-handler');

// 홈페이지 베스트셀러
router.get(
  '/bestsellers',
  asyncHandler(async (req, res) => {
    const bestSellers = await bookService.getBestSellers();
    res.status(200).json({
      status: 200,
      msg: '베스트셀러 목록 조회 완료',
      data: bestSellers,
    });
  })
);

// 상품 목록 조회
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 24);
    const result = await bookService.getBooks(page, perPage);
    res.status(200).json({
      status: 200,
      msg: '상품 목록 조회 완료',
      data: result,
    });
  })
);

// 상품 상세 조회
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await bookService.getBook(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ status: 404, msg: '책을 찾을 수 없습니다.' });
    }
    res.status(200).json({
      status: 200,
      msg: '상품 상세 조회 완료',
      data: book,
    });
  })
);

// 상품 추가 *admin
router.post(
  '/admin',
  asyncHandler(async (req, res) => {
    const newBook = await bookService.addBook(req.body);
    res.status(201).json({
      status: 201,
      msg: '상품 추가 완료',
      data: newBook,
    });
  })
);

// 상품 삭제 *admin
router.delete(
  '/admin/:id',
  asyncHandler(async (req, res) => {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({
      status: 200,
      msg: '상품 삭제 완료',
    });
  })
);

// 상품 수정 *admin
router.patch(
  '/admin/:id',
  asyncHandler(async (req, res) => {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      msg: '상품 수정 완료',
      data: updatedBook,
    });
  })
);

module.exports = router;