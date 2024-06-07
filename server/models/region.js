import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: false
  }
});

const Region = model('Region', regionSchema);

export default Region;
