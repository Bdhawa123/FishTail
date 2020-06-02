const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const iRoutes = require('./routes/IRoutes');
const AppError = require('./utils/appError');

const app = express();
const DB = 'mongodb://localhost:27017/sampleDatabase';
app.use(express.json());
//cors request middleware
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


app.use('/api/Inventory', iRoutes);

app.all('*', (req, res, next) => {
  (next(new AppError(`Can't find ${req.originalUrl}`, 404)));
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

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
    console.log('connection successful');
  });

const port = 3030;
app.listen(port, () => {
  console.log('App is running on port', port);
});
