const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = Schema({
  hash: {
    type: String,
  },
  secretText: {
    type: String
  },
  remainingViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Secret', SecretSchema);
