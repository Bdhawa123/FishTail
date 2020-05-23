const express = require('express');
const mongoose = require('mongoose');
const iRoutes = require('./routes/IRoutes');

const app = express();
const DB = 'mongodb://localhost:27017/sampleDatabase';

app.use(express.json());
app.use('/api/Inventory', iRoutes);

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
