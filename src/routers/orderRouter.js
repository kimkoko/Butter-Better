const express = require('express');
const orderRouter = express.Router();
const orderService = require('../services/orderService');
const asyncHandler = require('express-async-handler');

// Get orders by user Email
orderRouter.get(
  '/myorders',
  asyncHandler(async (req, res, next) => {
    // TODO 회원 - const { userEmail } = req.user;
    const orders = await orderService.getOrdersByEmail(userEmail);
    res.status(200).json({
      status: 200,
      message: '주문 목록 조회 성공',
      data: orders,
    });
  })
);

// Get orders by order ID
orderRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;
    const orders = await orderService.getOrdersByOrderId(orderId);
    res.status(200).json({
      status: 200,
      message: '주문 ID로 주문 상세 조회',
      data: orders,
    });
  })
);

// * Admin-Only : Get all orders
orderRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    // TODO adminAuth 관리자 검증
    const orders = await orderService.getOrderList();
    res.status(200).json({
      status: 200,
      message: '전체 주문 목록 조회 성공',
      data: orders,
    });
  })
);

// Create a new order
orderRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const orderInfo = req.body;
    const newOrder = await orderService.addOrder(orderInfo);

    res.status(201).json({
      status: 201,
      message: '주문 등록 성공',
      data: newOrder,
    });
  })
);

// TODO ID 가져오기
// Update an order by Id
orderRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    await orderService.updateOrderById(orderId);
    res.status(201).json({
      status: 201,
      message: '주문 수정 성공',
    });
  })
);

// TODO ID 가져오기
// Delete an order by ID
orderRouter.delete(
  '/:orderId',
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    await orderService.deleteOrder(orderId);
    res.status(201).json({
      status: 201,
      message: '주문 삭제 성공',
    });
  })
);

module.exports = orderRouter;
