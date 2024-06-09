import { Router } from 'express';
import Convenience from '../models/convenience.js';
import Education from '../models/education.js';
import Housing from '../models/housing.js';
import Population from '../models/population.js';
import Region from '../models/region.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Environment from '../models/environment.js';
import Safety from '../models/safety.js';

const recommendRouter = Router();

recommendRouter.get('/', async (req, res, next) => {
  const { first, second, third, option, min_price, max_price, min_price_2, max_price_2 } = req.query;

  const category = {
    convenience: Convenience,
    education: Education,
    environment: Environment,
    population: Population,
    region: Region,
    safety: Safety,
    transportation: Transportation,
    welfare: Welfare
  };

  // 우선순위 목록 가져오기
  const firstModel = category[first];
  const secondModel = category[second];
  const thirdModel = category[third];

  // 예산 범위에 충족되는 전세, 월세 데이터에서 id값 추출
  const jeonseData = await Housing.find( { 'jeonseDeposit' : { '$gte' : min_price, '$lte' : max_price }})
  const monthData = await Housing.find({
    $and: [
      { 'monthDeposit': { '$gte': min_price, '$lte': max_price } },
      { 'monthRent': { '$gte': min_price_2, '$lte': max_price_2 } }
    ]
  });

  const jeonseIds = jeonseData.map(data => data.id);
  const monthIds = monthData.map(data => data.id);

  // id값과 일치하는 우선순위 데이터 가져오기
  // 전세일 경우
  if (option == 'jeonse') {
    
    const firstData = await firstModel.find( { 'id': { $in: jeonseIds } } ).lean();
    const secondData = await secondModel.find( { 'id': { $in: jeonseIds } }).lean();
    const thirdData = await thirdModel.find( { 'id': { $in: jeonseIds } } ).lean();

    const firstIds = firstData.map(data => data.id);
    const secondIds = secondData.map(data => data.id);
    const thirdIds = thirdData.map(data => data.id);

    const firstRegion = await Region.find({ 'id': { $in: firstIds } }, 'gu dong').lean();
    const secondRegion = await Region.find({ 'id': { $in: secondIds }}, 'gu dong').lean();
    const thirdRegion = await Region.find({ 'id': { $in: thirdIds }}, 'gu dong').lean();

    const MatchedFirstData = firstData.map((data, index) => {
      return {
        gu: firstRegion[index].gu,
        dong: firstRegion[index].dong,
        data: data
      };
    });

    const MatchedSecondData = secondData.map((data, index) => {
      return {
        gu: secondRegion[index].gu,
        dong: secondRegion[index].dong,
        data: data
      };
    });

    const MatchedthirdData = thirdData.map((data, index) => {
      return {
        gu: thirdRegion[index].gu,
        dong: thirdRegion[index].dong,
        data: data
      };
    });
  
    res.send({
      first: MatchedFirstData,
      second: MatchedSecondData,
      third: MatchedthirdData
    });

  // 월세일 경우  
  } else if (option == 'month') {
    const firstData = await firstModel.find( { 'id': { $in: monthIds } } ).lean();
    const secondData = await secondModel.find( { 'id': { $in: monthIds} } ).lean();
    const thirdData = await thirdModel.find( { 'id': { $in: monthIds } } ).lean();

    const firstIds = firstData.map(data => data.id);
    const secondIds = secondData.map(data => data.id);
    const thirdIds = thirdData.map(data => data.id);

    const firstRegion = await Region.find({ 'id': { $in: firstIds } }, 'gu dong').lean();
    const secondRegion = await Region.find({ 'id': { $in: secondIds }}, 'gu dong').lean();
    const thirdRegion = await Region.find({ 'id': { $in: thirdIds }}, 'gu dong').lean();

    const MatchedFirstData = firstData.map((data, index) => {
      return {
        gu: firstRegion[index].gu,
        dong: firstRegion[index].dong,
        data: data
      };
    });

    const MatchedSecondData = secondData.map((data, index) => {
      return {
        gu: secondRegion[index].gu,
        dong: secondRegion[index].dong,
        data: data
      };
    });

    const MatchedthirdData = thirdData.map((data, index) => {
      return {
        gu: thirdRegion[index].gu,
        dong: thirdRegion[index].dong,
        data: data
      };
    });
  
    res.send({
      first: MatchedFirstData,
      second: MatchedSecondData,
      third: MatchedthirdData
    });
  };
});

export default recommendRouter;
