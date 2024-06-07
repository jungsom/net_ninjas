import { Schema, model } from 'mongoose';

const welfareSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
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
