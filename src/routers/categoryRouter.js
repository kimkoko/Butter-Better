const { Router } = require('express');
const categoryRouter = Router();
const { Category } = require('../db/models/categoryModel');
const asyncHandler = require('../utils/async-handler');
const bookService = require('../services/bookService');

// adminAuth - 관리자 확인
// const adminAuth = require('../middlewares/admin-auth')

// 카테고리 조회
categoryRouter.get(
  '/all',
  asyncHandler(async (req, res, next) => {
    const categories = await Category.find({});

    res.status(200).json({
      status: 200,
      message: '전체 카테고리 목록 조회 성공',
      data: categories,
    });
  })
);

// 카테고리 별 목록 조회
categoryRouter.get('/books/:categoryId', async (req, res, next) => {
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 24);

  const { books, total, totalPage } = await bookService.getBooksByCategory(
    req.params.categoryId,
    page,
    perPage
  );

  res.status(200).json({
    status: 200,
    message: '카테고리 별 목록 조회 성공',
    data: { totalPage: totalPage, productCount: total, books },
  });
});

// 카테고리 추가 *admin
categoryRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { category } = req.body;

    // 중복 확인
    const categoryName = await Category.findOne({ name: category });
    if (categoryName) {
      throw new Error('이미 있는 카테고리입니다.');
    }
    // db 저장
    await Category.create(req.body);

    res.status(201).json({
      status: 201,
      message: '카테고리 추가 성공',
      data: category,
    });
  })
);

// 카테고리 수정 *admin
categoryRouter.patch(
  '/:categoryId',
  asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, sort } = req.body;
    const toUpdate = { name, sort };

    const category = await Category.findById(categoryId);

    // ID 확인
    if (!category) {
      throw new Error('해당 카테고리의 id가 없습니다.');
    }
    // 중복 확인
    const categoryName = await Category.findOne({ name: req.body.name });
    if (categoryName) {
      throw new Error('이미 있는 카테고리입니다.');
    }

    const updateCategory = await Category.findOneAndUpdate(category, toUpdate);

    res.status(201).json({
      status: 201,
      message: '카테고리 수정 완료',
      data: updateCategory,
    });
  })
);

// 카테고리 삭제 *admin
// TODO admin 검증
categoryRouter.delete(
  '/:categoryId',
  asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    const deleteCategory = await Category.findOneAndDelete(category);
    if (!category) {
      throw new Error('해당 카테고리의 id가 없습니다.');
    }

    res.status(200).json({
      status: 200,
      message: '카테고리 삭제 완료',
      data: deleteCategory,
    });
  })
);

module.exports = categoryRouter;
