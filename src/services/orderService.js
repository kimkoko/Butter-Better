const asyncHandler = require('../utils/async-handeler');
const { Order } = require('../db/models/orderModel');

// 전체 주문 목록 조회 (관리자)
const getOrderList = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders.length === 0) {
    throw new error('현재 들어온 주문이 없습니다.');
  }
  res.json(orders);
});

// 회원 주문 목록 조회
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  if (orders.length === 0) {
    throw new error('현재 들어온 주문이 없습니다.');
  }
  res.json(orders);
});

// 주문 상세 조회
const getOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findOne({ _id: orderId });
});
