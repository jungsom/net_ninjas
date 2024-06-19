import {
  sortData,
  getAllData,
  paginateData
} from '../services/allResearchService.js';

function isSameRegion(keywords, gu, dong) {
  return keywords.some((keyword) => {
    let str = keyword.split(' ');
    if (str[0] == gu && str[1] == dong) return true;

    return false;
  });
}

const { keyword, column, sorting } = req.query;
const keywords = keyword.split(',').map((k) => k.trim());

console.log('keywords : ', keywords);

try {
  let data = (await getAllData()).filter((t) => {
    if (
      keywords.some((k) => t.gu.includes(k)) ||
      keywords.some((k) => t.dong.includes(k)) ||
      isSameRegion(keywords, t.gu, t.dong)
    )
      return true;
  });

  data = sortData(data, column, sorting);

  const paginatedData = paginateData(data, perPage, pageNo);

  res.json(paginatedData);
} catch (error) {
  next(error);
}

export async function searchData(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { keyword, column, sorting } = req.query;
  const keywords = keyword.split(',').map((k) => k.trim());

  try {
    let data = (await getAllData()).filter((t) => {
      if (includesSameRegion(keywords, `${t.gu} ${t.dong}`)) return true;
    });

    data = sortData(data, column, sorting);

    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}
