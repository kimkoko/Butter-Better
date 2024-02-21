const mongoose = require('mongoose');
const UserSchema = require('../schemas/user-schema');

exports.User = mongoose.model('Book', UserSchema);