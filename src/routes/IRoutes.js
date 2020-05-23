const express = require('express');
const IController = require('../controllers/InventoryController');

const router = express.Router();

router
  .route('/')
  .get(IController.createInventory);

module.exports = router;
