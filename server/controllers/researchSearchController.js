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

async function getRegionIdsByKeywords(keywords)
{
  const regions = await Region.find().lean();
  let regionIds = [];

  keywords.forEach((keyword)=>{
    if(isGu(keyword)){
      regionIds = regionIds.concat(regions.filter(region => region.gu === keyword).map(region => region.id));
    }else if(isDong(keyword)){
      regionIds = regionIds.concat(regions.filter(region => region.dong === keyword).map(region => region.id));
    }else if(isGuDong(keyword)){
      let guDong = keyword.split(' '); 
      regionIds = regionIds.concat(regions.filter(region => region.gu === guDong[0] && region.dong === guDong[1]).map(region => region.id));
    }
  });

  return [...new Set([...regionIds])];
}

async function getDatas(regionIds) {
  const data = {};
  const regions = await Region.find().lean();
  regions.filter(region => regionIds.includes(region.id)).forEach((region) => {
    const id = region.id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong
    };
  });

  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      if(regionIds.includes(record.id)){
      if (!data[record.id]) {
        data[record.id] = { 
        };
      }
      
      data[record.id][key] = record;
      delete data[record.id][key].id;
    }

    });
  }

  console.log(Object.values(data));
  return Object.values(data);
}

export async function searchData(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { keyword, column, sorting } = req.query;
  const keywords = keyword.split(',');

  try {
    let regionIds = await getRegionIdsByKeywords(keywords);
    let data = await getDatas(regionIds);
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

function isGu(keyword)
{
  let str = keyword.split(' ');
  if(str.length > 1) return false;
  if(!keyword.endsWith('구')) return false;

  return true;
}

function isDong(keyword)
{
  let str = keyword.split(' ');

  if(str.length > 1) return false;
  if(!keyword.endsWith('동')) return false;

  return true;
}

function isGuDong(keyword)
{
  let str = keyword.split(' ');

  if(str.length < 2) return false;
  if(!str[0].endsWith('구') || !str[1].endsWith('동')) return false;

  return true;
}