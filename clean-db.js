/*
  Use this script to clean database
*/

const mongoose = require('mongoose');
const config = require('./config/config');

const mongoUri = config.mongo.host;

const onConnect = (err) => {
  if (err) {
    console.error(err.stack);
  } else {
    mongoose.connection.db.dropDatabase();
  }

  mongoose.connection.close();
};

mongoose.connect(
  mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  onConnect
);

// mongoose.connection.close();
