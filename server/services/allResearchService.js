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

async function getRegions() {
  try {
    return await Region.find().lean();
  } catch (error) {
    const err = new Error('지역 데이터를 불러오는 중 오류가 발생했습니다.');
    next(err);
  }
}

async function getModelData(Model) {
  try {
    return await Model.find().lean();
  } catch (error) {
    const err = new Error(
      `${Model.modelName} 데이터를 불러오는 중 오류가 발생했습니다.`
    );
    next(err);
  }
}

async function getAllData() {
  const data = {};

  const regions = await getRegions();
  regions.forEach((region) => {
    const id = region.id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong
    };
  });

  for (const [key, Model] of Object.entries(models)) {
    const records = await getModelData(Model);
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

function sortData(data, column, sorting) {
  return data.sort((a, b) => {
    // 컬럼값, 정렬값이 보내진 경우
    if (column && sorting) {
      const aValue = a[column];
      const bValue = b[column];

      // 중복값인 경우: 기본 정렬 (구와 동 순)
      if (aValue === bValue) {
        if (a.gu === b.gu) {
          return a.dong > b.dong ? 1 : -1;
        }
        return a.gu > b.gu ? 1 : -1;
      }

      if (sorting === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    } else {
      // 기본 정렬 (구와 동 순)
      if (a.gu === b.gu) {
        return a.dong > b.dong ? 1 : -1;
      }
      return a.gu > b.gu ? 1 : -1;
    }
  });
}

function paginateData(data, perPage, pageNo) {
  return data.slice((pageNo - 1) * perPage, pageNo * perPage);
}

export { models, getAllData, sortData, paginateData };
