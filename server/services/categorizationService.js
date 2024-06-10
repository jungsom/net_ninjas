import Region from '../models/region.js';

export async function getAllConvenienceData() {
 return await generateDataByFields(['supermarket']);
}

export async function getAllEducationData() {
  return await generateDataByFields(['libraryCount', 'academyCount']);
 }

 export async function getAllEnvironmentData() {
  return await generateDataByFields(['parkRate']);
 }

 export async function getAllHousingData() {
  return await generateDataByFields(['jeonseDeposit', 'monthDeposit', 'monthRent']);
 }

 export async function getAllPopulationData() {
  return await generateDataByFields(['youthRate']);
 }

 export async function getAllSafetyData() {
  return await generateDataByFields(['crimeRate']);
 }

 export async function getAllTransportationData() {
  return await generateDataByFields(['busStation']);
 }

 export async function getAllWelfareData() {
  return await generateDataByFields(['cultureCount', 'medicalCount']);
 }

 export async function getAllData() {
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