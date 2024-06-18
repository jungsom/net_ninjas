import {
  sortData,
  getAllData,
  paginateData
} from '../services/allResearchService.js';

function includesSameRegion(regions, targetRegion) {
  return regions.some((region) => {
    const regionParts = region.split(' ');
    return targetRegion
      .split(' ')
      .slice(0, 2)
      .every((targetPart, idx) => targetPart === regionParts[idx]);
  });
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
