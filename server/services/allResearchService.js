import * as categorizationService from './categorizationService.js';

async function getAllData(jeonseMinDeposit, monthMinDeposit, minRent) {
  return await categorizationService.getAllData(
    jeonseMinDeposit,
    monthMinDeposit,
    minRent
  );
}

async function getAllDataByCategory(category) {
  switch (category) {
    case 'convenience':
      return await categorizationService.getAllConvenienceData();
    case 'education':
      return await categorizationService.getAllEducationData();
    case 'environment':
      return await categorizationService.getAllEnvironmentData();
    case 'housing':
      return await categorizationService.getAllHousingData();
    case 'population':
      return await categorizationService.getAllPopulationData();
    case 'safety':
      return await categorizationService.getAllSafetyData();
    case 'transportation':
      return await categorizationService.getAllTransportationData();
    case 'welfare':
      return await categorizationService.getAllWelfareData();
    default:
      throw new BadRequest('존재하지않는 카테고리');
  }
}

function sortData(data, column, sorting) {
  return data.sort((a, b) => {
    // 컬럼값, 정렬값이 보내진 경우
    if (column && sorting) {
      const aValue = a[column];
      const bValue = b[column];

      // 중복값인 경우: 기본 정렬 (구와 동 순)
      if (aValue === bValue) {
        if (a.gu === b.gu) {
          return a.dong > b.dong ? 1 : -1;
        }
        return a.gu > b.gu ? 1 : -1;
      }

      if (sorting === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    } else {
      // 기본 정렬 (구와 동 순)
      if (a.gu === b.gu) {
        return a.dong > b.dong ? 1 : -1;
      }
      return a.gu > b.gu ? 1 : -1;
    }
  });
}

function paginateData(data, perPage, pageNo) {
  let paginatedData = data.slice((pageNo - 1) * perPage, pageNo * perPage);
  const totalData = data.length;

  return { paginatedData, totalData };
}

export { getAllData, sortData, paginateData, getAllDataByCategory };
