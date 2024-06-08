import Education from '../models/education.js';
import Environment from '../models/environment.js';
import Housing from '../models/housing.js';
import Population from '../models/population.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Convenience from '../models/convenience.js';
import Safety from '../models/safety.js';
import Region from '../models/region.js';

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

// 모든 데이터를 가져와 gu, dong 별로 병합
async function getAllData() {
  const data = {};

  // region 컬렉션을 가져와 기본 구조 설정
  const regions = await Region.find().lean();
  regions.forEach((region) => {
    const id = region.id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong
    };
  });

  // 각 컬렉션의 데이터를 가져와 병합
  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      const id = record.id;
      if (!data[id]) {
        data[id] = {};
      }
      data[id][key] = record;
      delete data[id][key].id;
    });
  }

  return Object.values(data);
}

export async function allDataPerPage(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { column, sorting } = req.query;

  try {
    let data = await getAllData();

    // 데이터 정렬
    // 컬럼, 정렬방식이 들어올 경우
    if (column && sorting) {
      data = data.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        // 중복일 경우 : 기본 정렬 (구와 동 순)
        if (aValue === bValue) {
          if (a.gu === b.gu) {
            return a.dong > b.dong ? 1 : -1;
          }
          return a.gu > b.gu ? 1 : -1;
        }

        if (sorting === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    } else {
      // 컬럼, 정렬방식이 들어지 않을 경우 : 기본 정렬 (구와 동 순)
      data = data.sort((a, b) => {
        if (a.gu === b.gu) {
          return a.dong > b.dong ? 1 : -1;
        }
        return a.gu > b.gu ? 1 : -1;
      });
    }

    // 페이지네이션
    const paginatedData = data.slice((pageNo - 1) * perPage, pageNo * perPage);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}
