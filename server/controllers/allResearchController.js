import Education from '../models/education.js';
import Environment from '../models/environment.js';
import Housing from '../models/housing.js';
import Population from '../models/population.js';
import Transportation from '../models/transportation.js';
import Welfare from '../models/welfare.js';
import Convenience from '../models/convenience.js';
import Safety from '../models/safety.js';

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

// 모든 데이터를 가져오고 gu, dong 별로 병합
async function getAllData() {
  const data = {};

  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      const id = `${record.gu}-${record.dong !== undefined ? record.dong : ''}`;
      if (!data[id]) {
        data[id] = {
          gu: record.gu,
          dong: record.dong !== undefined ? record.dong : null
        };
      }
      if (key === 'Safety') {
        // Safety 모델인 경우 gu별 모든 dong에 동일한 값을 설정
        Object.values(data).forEach((entry) => {
          if (entry.gu === record.gu) {
            entry[key] = { ...record };
            delete entry[key].gu;
          }
        });
      } else {
        data[id][key] = { ...record };
        delete data[id][key].gu;
        delete data[id][key].dong;
      }
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
    if (column && sorting) {
      data = data.sort((a, b) => {
        if (sorting === 'asc') {
          return a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0;
        } else {
          return a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0;
        }
      });
    } else {
      // 기본 정렬: gu, dong
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
