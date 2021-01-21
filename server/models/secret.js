const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = Schema({
  hash: {
    type: String,
    required: true
  },
  secret: {
    type: Schema.Types.Mixed,
    required: true
  },
  remainingViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  expiresAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Secret', SecretSchema);
