import { Schema, model } from 'mongoose';

const populationSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: true
  },
  youthRate: {
    type: Number,
    required: true
  }
});

const Population = model('Population', populationSchema);

export default Population;
