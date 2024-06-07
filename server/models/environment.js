import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  parkRate: {
    type: Number,
    required: true
  }
});

const Environment = mongoose.model('Environment', environmentSchema);

export default Environment;