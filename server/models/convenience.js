import { Schema, model } from 'mongoose';

const convenienceSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
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
