import mongoose from "mongoose";

const safetySchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  crimeRate: {
    type: Number,
    required: true
  }
});

const Safety = mongoose.model('Safety', safetySchema);

export default Safety;