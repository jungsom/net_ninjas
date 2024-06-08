import { Schema, model } from 'mongoose';

const safetySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  crimeRate: {
    type: Number,
    required: true
  }
});

const Safety = model('Safety', safetySchema);

export default Safety;
