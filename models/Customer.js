const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Customerdetails = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar : {
    type : String,
    required : false
}
});

module.exports = mongoose.model('customer', Customerdetails);