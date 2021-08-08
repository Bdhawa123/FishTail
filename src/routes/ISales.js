const express = require("express");
const ISales = require("../controllers/SalesController");

const router = express.Router();

router.route("/").get(ISales.getAllSales).post(ISales.createSale);

module.exports = router;
