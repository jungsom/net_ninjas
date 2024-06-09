import Education from '../models/education.js';
import Environment from '../models/environment.js';
import Population from '../models/population.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Convenience from '../models/convenience.js';
import Safety from '../models/safety.js';
import Region from '../models/region.js';
import { BadRequest } from '../middlewares/errorMiddleware.js';

const models = {
    convenience: Convenience,
    education: Education,
    environment: Environment,
    population: Population,
    region: Region,
    safety: Safety,
    transportation: Transportation,
    welfare: Welfare
  };

function validateQuery(query) {
    // 우선순위 변수가 없을 때, 400 에러
    if(!query.first || !query.second || !query.third ) {
        throw new BadRequest('우선순위 카테고리를 찾을 수 없습니다.')
    }

    if (query.option === 'jeonse') {
        // 옵션, 전세에 대한 예산 금액을 입력하지 않을 때, 400 에러
        if (!query.option || !query.min_price || !query.max_price || query.min_price_2 || query.max_price_2) {
            throw new BadRequest('요청 변수를 찾을 수 없습니다.')
        }
        // 예산 금액이 숫자형이 아닐 때, 400 에러
        else if (isNaN(query.min_price) || isNaN(query.max_price)) {
            throw new BadRequest('예산 범위를 숫자로 입력해주세요.');
        }
    } else if (query.option === 'month') {
        // 옵션, 월세에 대한 예산 금액을 입력하지 않을 때, 400 에러
        if (!query.option || !query.min_price || !query.max_price || !query.min_price_2 || !query.max_price_2) {
            throw new BadRequest('요청 변수를 찾을 수 없습니다.')
        }
        // 예산 금액이 숫자형이 아닐 때, 400 에러
        else if (isNaN(query.min_price) || isNaN(query.max_price) || isNaN(query.min_price_2) || isNaN(query.max_price_2)) {
            throw new BadRequest('예산 범위를 숫자로 입력해주세요.');
        }} 
}

export { models, validateQuery };