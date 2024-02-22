const orderModel = require('../db/models/orderModel');
const customError = require('../middlewares/customError');

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async getOrderList() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrdersByUser(userId) {
    const orders = await this.orderModel.findById(userId);
    if (!orders || orders === null) {
      throw new customError('404', '해당 ID의 주문 내역이 없습니다.');
    }
    return orders;
  }

  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    if (!order || order === null) {
      throw new customError('404', '해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }

  async addOrder(orderInfo) {
    const { user_id, products, total_price } = orderInfo;
    const newOrder = await this.orderModel.create(orderInfo);
    if (!products || !total_price) {
      throw new customError('401', '주문 금액의 합이 0원 입니다.');
    }
    return newOrder;
  }

  async deleteOrder(orderId) {
    const order = await this.orderModel.delete(orderId);
    if (!order || order === null) {
      throw new customError('404', '해당 ID의 주문 내역이 없습니다.');
    }
    return order;
  }
}

const orderService = new OrderService(orderModel);
module.exports = orderService;
