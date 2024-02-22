const express = require('express');
const orderRouter = express.Router();
const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService');

// TODO 상품 데이터 연결

// TODO user 회원 검증
// 회원 주문 목록 조회 (/api/orders/list)
orderRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const orders = await OrderService.getOrdersByUser(req.currentUserId);
    res.status(200).json({
      status: 200,
      message: '회원 주문 목록 조회 성공',
    });
  })
);

// TODO admin 관리자 검증
// 관리자 주문 목록 조회 (/api/orders/list)
orderRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      status: 200,
      message: '전체 주문 목록 조회 성공',
    });
  })
);

// 주문 등록 (/api/orders)
orderRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const {
      seq,
      title,
      receiver,
      email,
      address,
      products,
      quantity,
      message,
      shipping_fee,
      total_price,
      created_at,
      status,
    } = req.body;
    res.status(201).json({
      status: 201,
      message: '주문 등록 성공',
    });
  })
);

// 주문 삭제 (/api/orders/:orderId)
orderRouter.delete(
  '/:orderId',
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    res.status(201).json({
      status: 201,
      message: '주문 삭제 성공',
    });
  })
);

// 주문 ID로 상세 조회 (/api/orders/:orderId)
orderRouter.get(
  '/:orderId',
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    res.status(200).json({
      status: 200,
      message: '주문 id로 주문 상세 조회',
    });
  })
);

module.exports = orderRouter;
