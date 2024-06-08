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
  // const regions = [
  //   { id: 1, gu: "강남구", dong: "역삼동" },
  //   { id: 2, gu: "강남구", dong: "삼성동" },
  //   { id: 3, gu: "강남구", dong: "논현동" },
  //   { id: 4, gu: "강동구", dong: "천호동" },
  //   { id: 5, gu: "강동구", dong: "성내동" },
  //   { id: 6, gu: "강서구", dong: "화곡동" },
  //   { id: 7, gu: "강서구", dong: "발산동" },
  //   { id: 8, gu: "강서구", dong: "등촌동" },
  //   { id: 9, gu: "관악구", dong: "신림동" },
  //   { id: 10, gu: "관악구", dong: "서원동" },
  //   { id: 11, gu: "관악구", dong: "난곡동" },
  // ];

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

  for (const [key, Model] of Object.entries(models)) {
    const records = await Model.find().lean();
    records.forEach((record) => {
      if(regionIds.includes(record.id)){
      if (!data[record.id]) {
        data[record.id] = { // todo : region에서 id로 구, 동 데이터 찾아서 삽입
          gu: record.gu,
          dong: record.dong !== undefined ? record.dong : null
        };
      }
      
      data[record.id][key] = { ...record };
      delete data[record.id][key].gu;
      delete data[record.id][key].dong;}

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