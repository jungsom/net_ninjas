import { Schema, model } from 'mongoose';

const welfareSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  cultureCount: {
    type: Number,
    required: true
  },
  medicalCount: {
    type: Number,
    required: true
  }
});

const Welfare = model('Welfare', welfareSchema);

export default Welfare;
