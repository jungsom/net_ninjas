import { Schema, model } from 'mongoose';

const housingSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: true
  },
  jeonseDeposit: {
    type: Number,
    required: true
  },
  monthDeposit: {
    type: Number,
    required: true
  },
  monthRent: {
    type: Number,
    required: true
  }
});

const Housing = model('Housing', housingSchema);

export default Housing;
