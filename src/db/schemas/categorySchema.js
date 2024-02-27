const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

module.exports = CategorySchema;
