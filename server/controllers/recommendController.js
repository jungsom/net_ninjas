import * as categorizationService from '../services/categorizationService.js';
import { validateRecommend, getModelData } from '../services/recommendService.js';


async function recommend(req, res, next) {
  try { 
    const { first, second, third, option, min_price, max_price, min_price_2, max_price_2 } = req.query;

    // 변수에 대한 검증 실시
    validateRecommend(req.query);

    // 예산 데이터, 선택된 카테고리의 점수 데이터 가져오기
    const housingData = await categorizationService.getAllHousingData();
    const gudongData = await categorizationService.getAllData();

    const firstData = await getModelData(first);
    const secondData = await getModelData(second);
    const thirdData = await getModelData(third);

    // 최종 추천 데이터 생성
    const totalScore = firstData.map((_, index) => {
      return firstData[index] * 1.3 + secondData[index] * 0.7 + thirdData[index] * 0.2;
      });

    const totalData = totalScore.map((score, index) => {
        return {
            id: gudongData[index]._id, 
            gu: gudongData[index].gu,
            dong: gudongData[index].dong,
            totalScore: score
        };
    })

    // 옵션이 전세일 경우
    if (option === 'jeonse') {

      // 예산 범위에 맞는 id값 배열로 추출
      const jeonseData = housingData.filter(data => data.jeonseDeposit >= min_price && data.jeonseDeposit <= max_price);
      const jeonseIds = jeonseData.map(data => data.id);

      // id값을 비교해 최종 점수 필터링 및 정렬
      const filterTotalScore = totalData.filter(data => jeonseIds.some(id => id.equals(data.id)))
                                                .sort((a, b) => b.totalScore - a.totalScore)

      res.json({
        first: filterTotalScore.slice(0, 1),
        second: filterTotalScore.slice(1, 2),
        third: filterTotalScore.slice(2, 3)
      });

    // 옵션이 월세일 경우
    } else if (option === 'month') {

      // 예산 범위에 맞는 id값 배열로 추출
      const monthData = housingData.filter(data => data.monthDeposit >= min_price && data.monthDeposit <= max_price && data.monthRent >= min_price_2 && data.monthRent <= max_price_2);
      const monthIds = monthData.map(data => data.id);
  
      // id값을 비교해 최종 점수 필터링 및 정렬
      const filterTotalScore = totalData.filter(data => monthIds.some(id => id.equals(data.id)))
                                                .sort((a, b) => b.totalScore - a.totalScore)

      res.json({
        first: filterTotalScore.slice(0, 1),
        second: filterTotalScore.slice(1, 2),
        third: filterTotalScore.slice(2, 3)
      });
    }
  } catch (error) {
    next(error)
  }
}

export default recommend;
