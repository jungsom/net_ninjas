import { Schema, model } from 'mongoose';

const convenienceSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  supermarket: {
    type: Number,
    required: true
  }
});

const Convenience = model('Convenience', convenienceSchema);

export default Convenience;
