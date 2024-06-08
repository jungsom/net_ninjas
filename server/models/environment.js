import { Schema, model } from 'mongoose';

const environmentSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  parkRate: {
    type: Number,
    required: true
  }
});

const Environment = model('Environment', environmentSchema);

export default Environment;
