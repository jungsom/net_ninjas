import { Schema, model } from 'mongoose';

const housingSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
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
