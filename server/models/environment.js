import { Schema, model } from 'mongoose';

const environmentSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
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
