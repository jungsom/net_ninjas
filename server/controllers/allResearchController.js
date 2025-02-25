import {
  getAllData,
  sortData,
  paginateData
} from '../services/allResearchService.js';

export async function allDataPerPage(req, res, next) {
  const perPage = parseInt(req.query.perPage) || 20;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const column = req.query.column;
  const sorting = req.query.sorting;
  const jeonseMinDeposit = parseInt(req.query.jeonseMinDeposit) || 0;
  const monthMinDeposit = parseInt(req.query.monthMinDeposit) || 0;
  const minRent = parseInt(req.query.minRent) || 0;

  try {
    let data = await getAllData(jeonseMinDeposit, monthMinDeposit, minRent);

    // 데이터 정렬
    data = sortData(data, column, sorting);

    // 페이지네이션
    const paginatedData = paginateData(data, perPage, pageNo);

    res.json(paginatedData);
  } catch (error) {
    const err = new Error('페이지별 데이터를 불러오는 중 오류가 발생했습니다.');
    err.status = 500;
    next(err);
  }
}
