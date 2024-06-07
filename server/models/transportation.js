import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  busStation: {
    type: Number,
    required: true
  }
});

const Transportation = mongoose.model('Transportation', transportationSchema);

export default Transportation;