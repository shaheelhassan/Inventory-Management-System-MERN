const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add an item name'],
    },
    sku: {
      type: String,
      required: [true, 'Please add an SKU'],
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
      default: 0,
    },
    supplier: {
      type: String,
      required: [true, 'Please add a supplier'],
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please add a purchase date'],
    },
    expiryDate: {
      type: Date,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
