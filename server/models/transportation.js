import { Schema, model } from 'mongoose';

const transportationSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: true
  },
  busStation: {
    type: Number,
    required: true
  }
});

const Transportation = model('Transportation', transportationSchema);

export default Transportation;
