import mongoose from "mongoose";

// Region 스키마 정의
const regionSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  }
});

const Region = mongoose.model('Region', regionSchema);

export default Region;