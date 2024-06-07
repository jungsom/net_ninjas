import { Schema, model } from 'mongoose';

// Region 스키마 정의
const regionSchema = new Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  }
});

const Region = model('Region', regionSchema);

export default Region;
