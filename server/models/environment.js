import { Schema, model } from 'mongoose';

const environmentSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: true
  },
  parkRate: {
    type: Number,
    required: true
  }
});

const Environment = model('Environment', environmentSchema);

export default Environment;
