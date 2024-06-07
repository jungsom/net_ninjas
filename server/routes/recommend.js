import { Router } from 'express';
import Convenience from '../models/convenience.js';
import Education from '../models/education.js';
import Housing from '../models/housing.js';
import Population from '../models/population.js';
import Region from '../models/safety.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Environment from '../models/environment.js';
import Safety from '../models/safety.js';

const recommendRouter = Router();

recommendRouter.get('/', async (req, res, next) => {
  const { first, second, third, min_price, max_price } = req.query;

  const category = {
    convenience: Convenience,
    education: Education,
    environment: Environment,
    housing: Housing,
    population: Population,
    region: Region,
    safety: Safety,
    transportation: Transportation,
    welfare: Welfare
  };

  const firstModel = category[first];
  const secondModel = category[second];
  const thirdModel = category[third];

  const firstData = await firstModel.find().lean();
  const secondData = await secondModel.find().lean();
  const thirdData = await thirdModel.find().lean();

  res.send({
    first: firstData,
    second: secondData,
    third: thirdData
  });
});

export default recommendRouter;
