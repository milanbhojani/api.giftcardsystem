const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GiftcardDetails = new Schema({
  companyName: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: false,
  },
  expiryDate: {
    type: String,
    required: false,
  },
  profit: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
  }
},{timestamps: true});

module.exports = mongoose.model("Giftcard", GiftcardDetails);
    