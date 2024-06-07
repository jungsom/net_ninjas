import { Schema, model } from 'mongoose';

const educationSchema = new Schema({
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

const Education = model('Education', educationSchema);

export default Education;
