const orderModel = require('../db/models/orderModel');
const { filterResponseOrder } = require('../utils/utils');

const orderModelInstance = orderModel;

class OrderService {
  constructor(orderModelInstance) {
    this.orderModel = orderModelInstance;
  }

  async getOrderList() {
    const orders = await this.orderModel.findAll();
    if (!orders) {
      throw new Error('주문 내역이 없습니다.');
    }
    return filterResponseOrder(orders);
  }

  async getOrdersByOrderId(orderId) {
    const orders = await this.orderModel.findByOrderId(orderId);
    if (!orders) {
      throw new Error('해당 주문 번호의 주문 내역이 없습니다.');
    }
    return filterResponseOrder(orders);
  }

  async getOrdersByEmail(userEmail) {
    const orders = await this.orderModel.findByEmail(userEmail);
    if (!orders.length) {
      throw new Error('해당 사용자의 주문 내역이 없습니다.');
    }
    return filterResponseOrder(orders);
  }

  async createOrder(toCreate) {
    if (!toCreate.total_price || toCreate.total_price === 0) {
      throw new Error('주문 금액의 합이 0원 입니다.');
    }

    const order = await this.orderModel.create(toCreate);
    return order;
  }

  async updateOrderById(orderId, toUpdate) {
    const order = await this.orderModel.updateOrderById(orderId, toUpdate);
    if (!order) {
      throw new Error('해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }

  async deleteOrder(orderId) {
    const order = await this.orderModel.delete(orderId);
    if (!order) {
      throw new Error('해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }
}

const orderService = new OrderService(orderModelInstance);
module.exports = orderService;
