const { Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    user_id: {
      type: String,
      ref: 'users',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema({
        postcode: String,
        main: String,
        detail: String,
      }),
      required: true,
    },
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
    quantity: {
      type: String,
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
    created_at: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ['주문 완료', '배송 중', '배송 완료', '주문 취소'],
      default: '주문 완료',
    },
  },
  { collection: 'orders', timestamps: true }
);

module.exports = OrderSchema;
