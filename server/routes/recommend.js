import { Router } from "express";
// import { convenience, education, environment, housing, population, region, safety, transportation, welfare } from "../models";

const recommendRouter = Router();

recommendRouter.get('/recommend', async (req, res) => {
    const { first, second, third, min_price, max_price } = req.query;
    res.send("Success!")
})

export default recommendRouter;
