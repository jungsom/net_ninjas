import mongoose from "mongoose";

const welfareSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  cultureCount: {
    type: Number,
    required: true
  },
  medicalCount: {
    type: Number,
    required: true
  }
});

const Welfare = mongoose.model('Welfare', welfareSchema);

export default Welfare;