const { Schema } = require('mongoose');
const bookSchema = require('./book-schema');

const OrderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema(
        {
          postcode: String,
          main: String,
          detail: String,
        },
        { _id: false }
      ),
      // required: true,
      default: {},
    },
    products: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    shipping_fee: {
      type: String,
      required: true,
    },
    total_price: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      enum: ['주문 완료', '배송 중', '배송 완료', '주문 취소'],
      default: '주문 완료',
    },
  },
  { collection: 'orders', timestamps: true }
);

module.exports = OrderSchema;
