const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const iRoutes = require("./routes/IRoutes");
const iSales = require("./routes/ISales");
const AppError = require("./utils/appError");

const app = express();
const DB = "mongodb://localhost:27017/fishtailDatabase";
app.use(express.json());

//cors request middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

app.use("/api/Inventory", iRoutes);
app.use("/api/Sales", iSales);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err.status);
  console.log(err.message);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  });

const port = 3030;
app.listen(port, () => {
  console.log("App is running on port", port);
});
