import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  gu: {
    type: String,
    required: true
  },
  dong: {
    type: String,
    required: false
  },
  busStation: {
    type: Number,
    required: true
  },
  libraryCount: {
    type: Number,
    required: true
  },
  academyCount: {
    type: Number,
    required: true
  },
  cultureCount: {
    type: Number,
    required: true
  },
  medicalCount: {
    type: Number,
    required: true
  },
  crimeRate: {
    type: Number,
    required: true
  },
  youthRate: {
    type: Number,
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
  },
  supermarket: {
    type: Number,
    required: true
  },
  parkRate: {
    type: Number,
    required: true
  },
  libraryCoutRank: {
    type: Number,
    required: true
  },
  busStationRank: {
    type: Number,
    required: true
  },
  cultureCountRank: {
    type: Number,
    required: true
  },
  medicalCountRank: {
    type: Number,
    required: true
  },
  crimeRateRank: {
    type: Number,
    required: true
  },
  youthRateRank: {
    type: Number,
    required: true
  },
  supermarketRank: {
    type: Number,
    required: true
  },
  parkRateRank: {
    type: Number,
    required: true
  },
  academyCountRank: {
    type: Number,
    required: true
  },
  eduScore: {
    type: Number,
    required: true
  },
  envScore: {
    type: Number,
    required: true
  },
  safeScore: {
    type: Number,
    required: true
  },
  welScore: {
    type: Number,
    required: true
  },
  popScore: {
    type: Number,
    required: true
  },
  transScore: {
    type: Number,
    required: true
  },
  convScore: {
    type: Number,
    required: true
  }
});

const Region = model('Region', regionSchema);

export default Region;
