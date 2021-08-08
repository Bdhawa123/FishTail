const Inventory = require("../models/inventoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createInventory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const Item = await Inventory.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Item,
    },
  });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
  const Items = await Inventory.find();

  res.status(200).json({
    status: "success",
    data: {
      Items,
    },
  });
});

exports.getItem = catchAsync(async (req, res, next) => {
  const Item = await Inventory.find({ ProductID: req.params.id });
  if (!Item) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    Item,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const ItemUpdate = await Inventory.findOneAndUpdate(
    { ProductID: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!ItemUpdate) {
    return next(new AppError("No Item found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      ItemUpdate,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const ItemUpdate = await Inventory.findOneAndDelete(
    { ProductID: req.params.id },
    req.body
  );

  if (!ItemUpdate) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
