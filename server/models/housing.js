const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  jeonseDeposit: {
    type: Number,
    required: true
  },
  monthDeposit: {
    type: Number,
    required: true
  },
  monthRent: {
    type: Number,
    required: true
  }
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;