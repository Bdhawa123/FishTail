const express = require('express');
const IController = require('../controllers/InventoryController');

const router = express.Router();

router
  .route('/')
  .get(IController.getAllItems)
  .post(IController.createInventory);

router
  .route('/:id')
  .get(IController.getItem)
  .patch(IController.updateItem)
  .delete(IController.deleteItem);

module.exports = router;
