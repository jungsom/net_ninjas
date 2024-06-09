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

function isGuDong(keywords, region)
{
  return keywords.some((keyword)=>{
    let str = keyword.split(' ');
    if(str[0] == region.gu && str[1] == region.dong) 
      return true;

    return false;
  });
}


async function getRegionsByKeywords(keywords)
{
  const records = await Region.find().lean();
  let regions = [];

  records.forEach((region)=> {
    if(keywords.includes(region.gu) || keywords.includes(region.dong) || isGuDong(keywords, region))
      regions.push(region);
  });

  return [...new Set([...regions])];
}

async function getDatas(regions) {
  const data = {};

  console.log("region result : ");

  regions.forEach((region) => {
    const id = region.id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong
    };

    console.log(region.id, region.gu, region.dong);

  });

  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      if(regions.map(t=> t.id).includes(record.id)){
      if (!data[record.id]) {
        data[record.id] = { 
        };
      }
      
      data[record.id][key] = record;
      delete data[record.id][key].id;
    }

    });
  }

  return Object.values(data);
}

export async function searchData(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { keyword, column, sorting } = req.query;
  const keywords = keyword.split(',');

  console.log("keywords : ", keywords);

  try {
    let regions = await getRegionsByKeywords(keywords);
    let data = await getDatas(regions);

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