import { Router } from "express";
import Convenience from "../models/convenience.js";
import Education from "../models/education.js";
import Housing from "../models/housing.js";
import Population from "../models/population.js";
import Region from "../models/safety.js";
import Transportation from "../models/transportation.js"; 
// import Welfare from "../models/welfare.js"

const recommendRouter = Router();

recommendRouter.get('/', async (req, res, next) => {
    const { first, second, third, min_price, max_price } = req.query;

    const category = {
        convenience,
        education,
        environment,
        housing,
        population,
        region,
        safety,
        transportation,
        welfare
    };

    if (category[first] & category[second] & category[third]) {
        first = category[first];
        second = category[second];
        third = category[third];
    }

    const firstData = await first.find().lean();
    const secondData = await second.find().lean();
    const thirdData = await third.find().lean();

    res.send(firstData, secondData, thirdData)
})

export default recommendRouter;
