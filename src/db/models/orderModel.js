const mongoose = require('mongoose');
const OrderSchema = require('../schemas/orderSchema');
const Order = mongoose.model('orders', OrderSchema);

class OrderModel {
  async findAll() {
    return await Order.find({}).sort({ created_at: -1 });
  }

  async findByUser(userId) {
    return await Order.find({ user_id: userId });
  }

  async findById(orderId) {
    return await Order.find({ _id: orderId });
  }

  async create(orderInfo) {
    return await Order.craete(orderInfo);
  }

  async delete(orderId) {
    return await Order.findOneAndDelete({ _id: orderId });
  }
}

const orderModel = new OrderModel();
module.exports = orderModel;
