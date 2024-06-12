import Place from '../models/place.js';

async function getPlaceData() {
  try {
    return await Place.find().lean();
  } catch (error) {
    const err = new Error('place 데이터를 불러오는 중 오류가 발생했습니다.');
    next(err);
  }
}

export { getPlaceData };
