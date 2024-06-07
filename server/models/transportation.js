import { Schema, model } from 'mongoose';

const transportationSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
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
