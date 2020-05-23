const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  ProductID: {
    type: String,
    required: [true, 'Id must be present'],
    unique: true,
  },
  ProductName: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  CostPrice: {
    type: Number,
    required: [true, 'Cost Price cannot be empty'],
  },
  SellingPrice: {
    type: Number,
    required: [true, 'Selling Price cannot be empty'],
  },
  Quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
