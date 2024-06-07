const mongoose = require('mongoose');

const populationSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  youthRate: {
    type: Number,
    required: true
  }
});

const Population = mongoose.model('Population', populationSchema);

module.exports = Population;