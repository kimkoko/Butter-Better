const { Router } = require('express');
const categoryRouter = Router();
const { Category } = require('../db/models/categoryModel');
const bookService = require('../services/bookService');
const asyncHandler = require('../utils/async-handler');

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

categoryRouter.get('/', async (req, res, next) => {
  console.log('카테고리 조회 확인용');
});

// 카테고리 추가 *admin
categoryRouter.post(
  '/admin',
  asyncHandler(async (req, res, next) => {
    const { name, sort } = req.body;
    const newCategory = await Category.create({
      name,
      sort,
    });
    res.status(201).json({
      status: 201,
      message: '카테고리 추가 성공',
      data: newCategory,
    });
  })
);

// 카테고리 수정 -> admin 한정
categoryRouter.patch(
  '/admin/:id',
  asyncHandler(async (req, res, next) => {
    const editedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      status: 201,
      message: '카테고리 추가 성공',
      data: editedCategory,
    });
  })
);

// 카테고리 삭제 -> admin 한정
categoryRouter.delete('/:categoryId', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;
