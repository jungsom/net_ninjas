import mongoose from "mongoose";

const housingSchema = new mongoose.Schema({
  guId: {
    type: String,
    required: true
  },
  dongId: {
    type: String,
    required: true
  },
  jeonseDeposit: {
    type: Number,
    required: true
  },
  monthDeposit: {
    type: Number,
    required: true
  },
  monthRent: {
    type: Number,
    required: true
  }
});

const Housing = mongoose.model('Housing', housingSchema);

export default Housing;