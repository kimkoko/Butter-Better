const Router = require('express')
const categoryService = require('../services/category-service')
const asyncHandler = require('../utils/async-handeler');
const categoryRouter = Router()

// adminAuth - 관리자 확인
// const adminAuth = require('../middlewares/admin-auth')

// 카테고리 조회
categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({
            status: 200,
            message: '전체 카테고리 목록 조회 성공',
            data: categories,
        })
    }
    catch (error) {
        next(error)
    }
})

// 카테고리 추가 -> admin 한정
categoryRouter.post('/', adminAuth, async (req, res, next) => {
    try {
        const newCategory = await categoryService.addCategory(req.body)

        res.status(201).json({
            status: 201,
            message: '카테고리 추가 성공',
            data: newCategory,
        })
    }
    catch (error) {
        next(error)
    }
})

// 카테고리 수정 -> admin 한정
categoryRouter.patch('/:categoryId', adminAuth, async (req, res, next) => {
    try {

        const { categoryId } = req.params;
        const { name, sort } = req.body;
        const toUpdate = { name, sort };

        const updateCategory = await categoryService.setCategory(categoryId, toUpdate)

        res.status(200).json({
            status: 200,
            message: '카테고리 수정 완료',
            data: toUpdate,
        })
    }
    catch (error) {
        next(error)
    }
})

// 카테고리 삭제 -> admin 한정
categoryRouter.delete('/:categoryId', adminAuth, async (req, res, next) => {
    try {

        const { categoryId } = req.params;
        const deleteCategory = await categoryService.deleteCategory(categoryId);

        res.status(200).json({
            status: 200,
            message: '카테고리 삭제 완료',
            data: {deleteCategory},
        })
    }
    catch (error) {
        next(error)
    }
})

module.exports = categoryRouter;