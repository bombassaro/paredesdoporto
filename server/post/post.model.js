const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const modelHookHandler = require('../base/modelHookHandler');

const Schema = new mongoose.Schema(
  {
    title: { type: String },
    link: { type: String },
    local: { type: String },
    rdate: { type: String },
    parents: { type: Array },
    tags: { type: Array }
  }, 
  {
    timestamps: true
  }
);

Schema.plugin(mongoosePaginate);
modelHookHandler(Schema).withStaticMethods();
module.exports = mongoose.model('Post', Schema);