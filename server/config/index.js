import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

const handleOpen = () => console.log(`Connected to DB`);
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

const config = {
  jwtSecret: process.env.JWT_SECRET,
  db: {
    uri: process.env.MONGO_URI
  }
};

export default config;
