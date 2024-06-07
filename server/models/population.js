import { Schema, model } from 'mongoose';

const populationSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
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
