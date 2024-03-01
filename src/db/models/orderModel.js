const mongoose = require('mongoose');
const OrderSchema = require('../schemas/orderSchema');
const Order = mongoose.model('orders', OrderSchema);

class OrderModel {
  async findAll() {
    return await Order.find({}).sort({ createdAt: -1 });
  }

  async findByOrderId(orderId) {
    return await Order.findById(orderId).lean();
  }

  async create(toCreate) {
    return await Order.create(toCreate);
  }

  async updateOrderById(orderId, toUpdate) {
    return await Order.findByIdAndUpdate(orderId, toUpdate).lean();
  }

  async delete(orderId) {
    return await Order.findByIdAndDelete(orderId);
  }
}

const orderModel = new OrderModel();
module.exports = orderModel;
