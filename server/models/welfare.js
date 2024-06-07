import { Schema, model } from 'mongoose';

const welfareSchema = new Schema({
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

const Welfare = model('Welfare', welfareSchema);

export default Welfare;
