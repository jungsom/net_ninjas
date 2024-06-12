import {
  sortData,
  getAllData,
  paginateData
} from '../services/allResearchService.js';

function isGuDong(keywords, gu, dong) {
  return keywords.some((keyword) => {
    let str = keyword.split(' ');
    if (str[0] == gu && str[1] == dong) return true;

    return false;
  });
}

export async function searchData(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const { keyword, column, sorting } = req.query;
  const keywords = keyword.split(',').map(k => k.trim());

  console.log('keywords : ', keywords);

  try {
    let data = (await getAllData()).filter(
      (t) =>
        keywords.includes(t.gu) ||
        keywords.includes(t.dong) ||
        isGuDong(keywords, t.gu, t.dong)
    );

    data = sortData(data, column, sorting);

    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
}
