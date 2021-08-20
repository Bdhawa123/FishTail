const mongoose = require("mongoose");

const ProductSales = new mongoose.Schema({
  ProductID: {
    type: String,
    required: [true, "Product Id is needed"],
  },
  CostPrice: {
    type: Number,
    required: [true, "Cost Price cannot be empty"],
  },
  SellingPrice: {
    type: Number,
    required: [true, "Selling Price cannot be empty"],
  },
  Quantity: {
    type: Number,
    required: [true, "Quantity cannot be empty"],
  },
});

const SaleSchema = new mongoose.Schema(
  {
    SaleID: {
      type: String,
      required: [true, "Id must be present"],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    Sales: {
      type: [ProductSales],
      default: [
        {
          ProductID: "123",
          CostPrice: "123",
          SellingPrice: "123",
          Quantity: "123",
        },
      ],
    },
  },
  { collection: "Sales" }
);

const Sales = mongoose.model("Sales", SaleSchema);
module.exports = Sales;
