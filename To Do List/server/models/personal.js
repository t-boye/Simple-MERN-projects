const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Personal = mongoose.model('Personal', personalSchema);

module.exports = Personal;
