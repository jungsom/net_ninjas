import Region from '../models/region.js';

export async function allConvenienceData() {
 return await generateDataByFields(['supermarket']);
}

export async function allEducationData() {
  return await generateDataByFields(['libraryCount', 'academyCount']);
 }

 export async function allEnvironmentData() {
  return await generateDataByFields(['parkRate']);
 }

 export async function allHousingData() {
  return await generateDataByFields(['jeonseDeposit', 'monthDeposit', 'monthRent']);
 }

 export async function allPopulationData() {
  return await generateDataByFields(['youthRate']);
 }

 export async function allSafetyData() {
  return await generateDataByFields(['crimeRate']);
 }

 export async function allTransportationData() {
  return await generateDataByFields(['busStation']);
 }

 export async function allWelfareData() {
  return await generateDataByFields(['cultureCount', 'medicalCount']);
 }

 export async function allData() {
  const regions = await getRegions();
  return regions;
 }

async function generateDataByFields(fields){
  const regions = await getRegions();
  const data = {};

  regions.forEach((region) => {
    const id = region._id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong,
    };

    fields.forEach((field) => {
      data[id][field] = region[field];
    });
  });

  return Object.values(data);
}

async function getRegions() {
  try {
    return await Region.find().lean();

  } catch (error) {
    const err = new Error('지역 데이터를 불러오는 중 오류가 발생했습니다.');
    next(err);
  }
}