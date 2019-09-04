const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const modelHookHandler = require('../base/modelHookHandler');

const Schema = new mongoose.Schema(
  {
    order: { type: String },
    parent: { type: String },
    path: { type: String },
    name: { type: String },
  }, 
	{
    timestamps: true
	}
);

Schema.plugin(mongoosePaginate);
modelHookHandler(Schema).withStaticMethods();
module.exports = mongoose.model('Collection', Schema);