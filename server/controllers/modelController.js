import Education from '../models/education.js';
import Environment from '../models/environment.js';
import Housing from '../models/housing.js';
import Population from '../models/population.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Convenience from '../models/convenience.js';
import Safety from '../models/safety.js';

const models = {
  Education,
  Environment,
  Housing,
  Population,
  Transportation,
  Welfare,
  Convenience,
  Safety
};

export const getModelData = async (req, res, next) => {
  const { modelName } = req.query;

  try {
    const Model = models[modelName];
    const data = await Model.find().lean();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
