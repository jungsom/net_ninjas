import Region from '../models/region.js';
import {sortData, getAllData, paginateData} from '../services/allResearchService.js';

function isGuDong(keywords, region)
{
  return keywords.some((keyword)=>{
    let str = keyword.split(' ');
    if(str[0] == region.gu && str[1] == region.dong) 
      return true;

    return false;
  });
}

async function getRegionIdsByKeywords(keywords)
{
  const records = await Region.find().lean();
  let regionIds = [];

  records.forEach((region)=> {
    if(keywords.includes(region.gu) || keywords.includes(region.dong) || isGuDong(keywords, region))
      regionIds.push(region.id);
  });

  return [...new Set([...regionIds])];
}

export async function searchData(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { keyword, column, sorting } = req.query;
  const keywords = keyword.split(',');

  console.log("keywords : ", keywords);

  try {
    let regionIds = await getRegionIdsByKeywords(keywords);
    let data = (await getAllData()).filter(t=> regionIds.includes(t.id));

    // 데이터 정렬
    data = sortData(data, column, sorting);

    // 페이지네이션
    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}