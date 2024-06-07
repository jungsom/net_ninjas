import { Schema, model } from 'mongoose';

const safetySchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  crimeRate: {
    type: Number,
    required: true
  }
});

const Safety = model('Safety', safetySchema);

export default Safety;
