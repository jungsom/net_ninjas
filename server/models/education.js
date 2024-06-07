const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  libraryCount: {
    type: Number, 
    required: true
  },
  academyCount: {
    type: Number, 
    required: true
  }
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;