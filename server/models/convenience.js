import { Schema, model } from 'mongoose';

const convenienceSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: true
  },
  supermarket: {
    type: Number,
    required: true
  }
});

const Convenience = model('Convenience', convenienceSchema);

export default Convenience;
