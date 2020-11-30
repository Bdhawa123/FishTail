const Inventory = require('../models/inventoryModel');
const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');


/**
 * Need to get another set for Sales data
 */
exports.getTypeAheadInventory = catchAsync(async (req, res, next) => {
  const ProductID = await Inventory.find({}, { ProductID: 1, _id: 0 });
  const ProductName = await Inventory.find({}, { ProductName: 1, _id: 0 });
  const typeAheadData = ProductID.concat(ProductName);

  res.status(200).json({
    status: 'success',
    typeAheadData,
  });
});
