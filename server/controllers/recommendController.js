import Housing from '../models/housing.js';
import Region from '../models/region.js';
import { models, validateQuery } from '../services/recommendService.js';


async function recommend(req, res) {
    const { first, second, third, option, min_price, max_price, min_price_2, max_price_2 } = req.query

    // 변수에 대한 검증 실시
    validateQuery(req.query);
    
    // 우선순위 모델 불러오기 
    const firstModel = models[first];
    const secondModel = models[second];
    const thirdModel = models[third];
  
    // 전세일 때, 예산 범위에 맞는 데이터 보내주기
    if (option == 'jeonse') {

      // 범위에 맞는 구, 동 데이터 저장
      const jeonseData = await Housing.find( { 'jeonseDeposit' : { '$gte' : min_price, '$lte' : max_price }})
      const jeonseIds = jeonseData.map(data => data.id);
      
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
    
      res.json({
        first: MatchedFirstData,
        second: MatchedSecondData,
        third: MatchedthirdData
      });
  
    // 전세일 때, 예산 범위에 맞는 데이터 보내주기
    } else if (option == 'month') {

        // 범위에 맞는 구, 동 데이터 찾기
        const monthData = await Housing.find({
            $and: [
                { 'monthDeposit': { '$gte': min_price, '$lte': max_price } },
                { 'monthRent': { '$gte': min_price_2, '$lte': max_price_2 } }
            ]
            });
        const monthIds = monthData.map(data => data.id);

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
    
      res.json({
        first: MatchedFirstData,
        second: MatchedSecondData,
        third: MatchedthirdData
      });
    };
  }

  export default recommend;