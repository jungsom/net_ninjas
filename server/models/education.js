import { Schema, model } from 'mongoose';

const educationSchema = new Schema({
  id: {
    type: Number,
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
