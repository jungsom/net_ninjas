import { Schema, model } from 'mongoose';

const populationSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  youthRate: {
    type: Number,
    required: true
  }
});

const Population = model('Population', populationSchema);

export default Population;
