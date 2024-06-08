import { Schema, model } from 'mongoose';

const housingSchema = new Schema({
  id: {
    type: Number,
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
