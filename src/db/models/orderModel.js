const mongoose = require('mongoose');
const OrderSchema = require('../schemas/OrderSchema');

exports.Order = mongoose.model('Order', OrderSchema);
