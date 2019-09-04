const mongoose = require('mongoose');
const config = require('./config/config');
const mongoUri = config.mongo.host;

const postModel = require('./server/post/post.model');
const userModel = require('./server/user/user.model');
const collectionModel = require('./server/collection/collection.model');
const collecionSeed = require('./migration/collections');
const postSeed = require('./migration/posts');

const onConnect = (err) => {
  if (err) {
    console.error(err.stack);
  } else {
    addCollections();
    // addPosts(); 
    // userModel.find({}, (err, users) => {
    //   if (!err) {
    //     // addAdminUser();
    //     addNewPost();
    //   } else {
    //     console.log(err);
    //   }
    // });
  }
};

function addCollections() {
  // pass encoded: $2a$10$j3UJPC3gTyE36Hxw5VyNyea.EI78zsgbm4RPl0R3GXNIQAbD6K0i.
  collectionModel.create(collecionSeed.data, (err, user) => {
    if(!err) {
      console.log('Collections created !');
    } else {
      console.log(err);
    }
    mongoose.connection.close();
  });
}
function addPosts() {
  // pass encoded: $2a$10$j3UJPC3gTyE36Hxw5VyNyea.EI78zsgbm4RPl0R3GXNIQAbD6K0i.
  postModel.create(postSeed.data, (err, user) => {
    if(!err) {
      console.log('Posts created !');
    } else {
      console.log(err);
    }
    mongoose.connection.close();
  });
}

function addAdminUser() {
  // pass encoded: $2a$10$j3UJPC3gTyE36Hxw5VyNyea.EI78zsgbm4RPl0R3GXNIQAbD6K0i.
  userModel.create({
    firstname: 'Admin',
    email: 't@t.com',
    password: '123',
    code: '000-000-000-00',
    isAdmin: true,
    isActive: true
  }, (err, user) => {
    if (!err) {
      console.log('User admin created !');
    } else {
      console.log(err);
    }

    mongoose.connection.close();
  });
}

function addNewPost() {
  postModel.create({
    name: 'POST',
    code: '000-000-000-00',
  }, (err, user) => {
    if (!err) {
      console.log('Post created !');
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
