const express = require('express');
const orderRouter = express.Router();

// TODO 상품 데이터 연결

// TODO user 회원 검증
// 회원 주문 목록 조회 (/api/orders/list)
orderRouter.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: '전체 주문 목록 조회 성공',
    });
  } catch (err) {
    next(err);
  }
});

// TODO admin 관리자 검증
// 관리자 주문 목록 조회 (/api/orders/list)
orderRouter.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: '회원 주문 목록 조회 성공',
    });
  } catch (err) {
    next(err);
  }
});

// 주문 등록 (/api/orders)
orderRouter.post('/', async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { phoneNumber, address, totalPrice, products } = req.body;
  } catch (err) {
    next(err);
  }
});

module.exports = orderRouter;
