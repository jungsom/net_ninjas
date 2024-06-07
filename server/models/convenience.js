import mongoose from "mongoose";

const convenienceSchema = new mongoose.Schema({
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

const Convenience = mongoose.model('Convenience', convenienceSchema);

export default Convenience;