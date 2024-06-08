import { Schema, model } from 'mongoose';

const transportationSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  busStation: {
    type: Number,
    required: true
  }
});

const Transportation = model('Transportation', transportationSchema);

export default Transportation;
