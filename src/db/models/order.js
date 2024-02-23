const mongoose = require('mongoose');
const OrderSchema = require('../schemas/order');
const Order = mongoose.model('orders', OrderSchema);

class OrderModel {
  // 생성 날짜 별로 내림차순 정렬, 최신순
  async findAll() {
    return await Order.find({}).sort({ createdAt: -1 }).lean();
  }

  async findByOrderId(orderId) {
    return await Order.findById(orderId);
  }

  async findByEmail(userEmail) {
    return await Order.findByEmail({ email: userEmail }).lean();
  }

  async findById(orderId) {
    return await Order.findById({ _id: orderId });
  }

  async create(toCreate) {
    return await Order.create(toCreate);
  }

  async updateById(orderId, toUpdate) {
    return await Order.findByIdAndUpdate(orderId, toUpdate);
  }

  async delete(orderId) {
    return await Order.findOneAndDelete({ _id: orderId }).lean();
  }
}

const orderModel = new OrderModel();
module.exports = orderModel;
