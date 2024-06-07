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

// 모든 데이터를 가져오고 guId, dongId 별로 병합
async function getAllData() {
  const data = {};

  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      const id = `${record.guId}-${
        record.dongId !== undefined ? record.dongId : ''
      }`;
      // 새 데이터 객체 생성
      if (!data[id])
        data[id] = {
          guId: record.guId,
          dongId: record.dongId !== undefined ? record.dongId : null
        };
      if (key === 'Safety') {
        // Safety모델인 경우 guId별 모든 dongId에 동일한 값을 설정
        Object.values(data).forEach((entry) => {
          if (entry.guId === record.guId) {
            entry[key] = record;
          }
        });
      } else {
        //Safety가 아닌 경우, 해당 레코드를 추가
        data[id][key] = record;
      }
    });
  }

  return Object.values(data);
}

export async function allDataPerPage(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { column, sorting } = req.body;

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
      // 기본 정렬: guId, dongId
      data = data.sort((a, b) => {
        if (a.guId === b.guId) {
          return a.dongId > b.dongId ? 1 : -1;
        }
        return a.guId > b.guId ? 1 : -1;
      });
    }

    // 페이지네이션
    const paginatedData = data.slice((pageNo - 1) * perPage, pageNo * perPage);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}
