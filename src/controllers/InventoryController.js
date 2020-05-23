const Inventory = require('../models/inventoryModel');
const catchAsync = require('../utils/catchAsync');


exports.createInventory = catchAsync(async (req, res, next) => {
  const newItem = await Inventory.create(req.body);
  console.log(newItem);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newItem,
    },
  });
});

exports.getAllUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
