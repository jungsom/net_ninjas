import {getPlaceData} from '../services/placeService.js';

export async function allDataPerPage(req, res, next) {
  try {
    let data = await getPlaceData();

    res.json(data);
  } catch (error) {
    const err = new Error('페이지별 데이터를 불러오는 중 오류가 발생했습니다.');
    next(err);
  }
}
