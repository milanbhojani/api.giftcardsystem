const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required:true
  },
  details: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);