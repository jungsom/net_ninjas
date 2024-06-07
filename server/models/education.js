import { Schema, model } from 'mongoose';

const educationSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
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
