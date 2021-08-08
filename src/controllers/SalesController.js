const Sales = require("../models/salesModal");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

exports.getAllSales = catchAsync(async (req, res, next) => {
  const SaleItems = await Sales.find();
  res.status(200).json({
    status: "success",
    data: {
      SaleItems,
    },
  });
});

exports.createSale = catchAsync(async (req, res, next) => {
  const Sale = await Sales.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Sale,
    },
  });
});
