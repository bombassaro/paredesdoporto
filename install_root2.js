const mongoose = require('mongoose');
const config = require('./config/config');
const mongoUri = config.mongo.host;

const postModel = require('./server/post/post.model');
const userModel = require('./server/user/user.model');
const collectionModel = require('./server/collection/collection.model');
const postSeed = require('./migration/posts');

const root2 = require('./migration/root2');

const onConnect = (err) => {
  if (err) {
    console.error(err.stack);
  } else {
    addCollections();
  }
};

function addCollections() {
  collectionModel.create(root2.data, (err, user) => {
    if(!err) {
      console.log('Collections created !');
    } else {
      console.log(err);
    }
    mongoose.connection.close();
  });
}

mongoose.connect(
  mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  onConnect
);
