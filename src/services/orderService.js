const orderModel = require('../db/models/orderModel');
const customError = require('../middlewares/customError');
const { ObjectId } = require('mongoose').Types;

const orderModelInstance = orderModel;

class OrderService {
  constructor(orderModelInstance) {
    this.orderModel = orderModelInstance;
  }

  async getOrderList() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrdersByOrderId(orderId) {
    const orders = await this.orderModel.findByOrderId(orderId);
    if (!orders.length) {
      throw new Error('해당 주문 번호의 주문 내역이 없습니다.');
    }
    return orders;
  }

  async getOrdersByEmail(userEmail) {
    const orders = await this.orderModel.findAll();
    const orderByEmail = orders.filter((order) => order.email === userEmail);
    if (!orderByEmail.length) {
      throw new Error('해당 사용자의 주문 내역이 없습니다.');
    }
    return orderByEmail;
  }

  async addOrder(toCreate) {
    // if (!email) {
    //   throw new Error('해당 사용자의 주문 내역이 없습니다.');
    // }
    // if (!products || !total_price || total_price === 0) {
    //   throw new Error('주문 금액의 합이 0원 입니다.');
    // }

    const newId = new ObjectId(toCreate._id);
    toCreate._id = newId;

    const newOrder = await this.orderModel.create(toCreate);
    const savedOrder = await newOrder.save(); // document 저장
    return savedOrder;
  }

  async updateOrderById(orderId) {
    const order = await this.orderModel.updateOrderById(orderId);
    if (!order) {
      throw new Error('해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }

  async deleteOrder(orderId) {
    const order = await this.orderModel.delete(orderId);
    if (!order) {
      throw new customError('404', '해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }
}

const orderService = new OrderService(orderModelInstance);
module.exports = orderService;
