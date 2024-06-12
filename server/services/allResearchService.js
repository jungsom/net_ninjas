import * as categorizationService from './categorizationService.js';

async function getAllData() {
  return await categorizationService.getAllData();
}

async function getAllDataByCategory(category) {
  switch (category) {
    case 'Convenience':
      return await categorizationService.getAllConvenienceData();
    case 'Education':
      return await categorizationService.getAllEducationData();
    case 'Environment':
      return await categorizationService.getAllEnvironmentData();
    case 'Housing':
      return await categorizationService.getAllHousingData();
    case 'Population':
      return await categorizationService.getAllPopulationData();
    case 'Safety':
      return await categorizationService.getAllSafetyData();
    case 'Transportation':
      return await categorizationService.getAllTransportationData();
    case 'Welfare':
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
  return data.slice((pageNo - 1) * perPage, pageNo * perPage);
}

export { getAllData, sortData, paginateData, getAllDataByCategory };
