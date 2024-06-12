import { Schema, model } from 'mongoose';

const placeSchema = new Schema({
    gu: {
        type: String,
        required: true
      },
    university: {
        type: String,
        required: true
    },
    touristArea: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: true
    },
    academyCount: {
        type: Number,
        required: true
    },
    parkRate: {
        type: Number,
        required: true
    },
    crimeRate: {
        type: Number,
        required: true
    },
    academyCountRank: {
        type: Number,
        required: true
    },
    parkRateRank: {
        type: Number,
        required: true
    },
    crimeRateRank: {
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
    youthRateRank: {
        type: Number,
        required: true
    },
    supermarketRank: {
        type: Number,
        required: true
    }
});

const Place = model('Place', placeSchema);

export default Place;
