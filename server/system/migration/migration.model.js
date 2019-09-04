const mongoose = require('mongoose');

/**
 * Schema
 */
const MigrationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Migration', MigrationSchema);
