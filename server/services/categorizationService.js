import Region from '../models/region.js';

const FIELDS = {
  SUPERMARKET: 'supermarket',
  LIBRARY_COUNT: 'libraryCount',
  ACADEMY_COUNT: 'academyCount',
  PARK_RATE: 'parkRate',
  JEONSE_DEPOSIT: 'jeonseDeposit',
  MONTH_DEPOSIT: 'monthDeposit',
  MONTH_RENT: 'monthRent',
  YOUTH_RATE: 'youthRate',
  CRIME_RATE: 'crimeRate',
  CRIME_RATE: 'crimeRate',
  BUS_STATION: 'busStation',
  CULTURE_COUNT: 'cultureCount',
  MEDICAL_COUNT: 'medicalCount',
  WELFARE_TOTAL: 'welfareTotal',
  MURDER: 'murder',
  ROBBERY: 'robbery',
  RAPE: 'rape',
  THEFT: 'theft',
  VIOLENCE: 'violence',
  TEEN_RATE: 'teenRate',
  ELD_RATE: 'eldRate'
};

export async function getAllConvenienceData() {
  return await generateDataByFields([FIELDS.SUPERMARKET]);
}

export async function getAllEducationData() {
  return await generateDataByFields([
    FIELDS.LIBRARY_COUNT,
    FIELDS.ACADEMY_COUNT
  ]);
}

export async function getAllEnvironmentData() {
  return await generateDataByFields([FIELDS.PARK_RATE]);
}

export async function getAllHousingData() {
  return await generateDataByFields([
    FIELDS.JEONSE_DEPOSIT,
    FIELDS.MONTH_DEPOSIT,
    FIELDS.MONTH_RENT
  ]);
}

export async function getAllPopulationData() {
  return await generateDataByFields([
    FIELDS.YOUTH_RATE,
    FIELDS.TEEN_RATE,
    FIELDS.ELD_RATE
  ]);
}

export async function getAllSafetyData() {
  return await generateDataByFields([
    FIELDS.CRIME_RATE,
    FIELDS.MURDER,
    FIELDS.ROBBERY,
    FIELDS.RAPE,
    FIELDS.THEFT,
    FIELDS.VIOLENCE
  ]);
}

export async function getAllTransportationData() {
  return await generateDataByFields([FIELDS.BUS_STATION]);
}

export async function getAllWelfareData() {
  return await generateDataByFields([
    FIELDS.CULTURE_COUNT,
    FIELDS.MEDICAL_COUNT,
    FIELDS.WELFARE_TOTAL
  ]);
}

export async function getAllData(
  jeonseMinDeposit = 0,
  monthMinDeposit = 0,
  minRent = 0
) {
  return await getRegions(jeonseMinDeposit, monthMinDeposit, minRent);
}

async function generateDataByFields(fields) {
  const regions = await getRegions();
  const data = {};

  regions.forEach((region) => {
    const id = region._id;
    data[id] = {
      id: id,
      gu: region.gu,
      dong: region.dong
    };

    function generateCustomField(custom) {
      if (custom.type == 'sum')
        return custom.fields
          .map((t) => region[t])
          .reduce((total, amount) => total + amount);
    }

    fields.forEach((field) => {
      if (region[field] != undefined) data[id][field] = region[field];
      else data[id][field] = generateCustomField(getCustomFieldData(field));
    });
  });

  return Object.values(data);
}

function getCustomFieldData(field) {
  switch (field) {
    case FIELDS.WELFARE_TOTAL:
      return {
        type: 'sum',
        fields: [FIELDS.CULTURE_COUNT, FIELDS.MEDICAL_COUNT]
      };
    default:
      return -1;
  }
}

async function getRegions(
  jeonseMinDeposit = 0,
  monthMinDeposit = 0,
  minRent = 0
) {
  try {
    const minConditions = [];

    if (jeonseMinDeposit > 0) {
      minConditions.push({ jeonseDeposit: { $gte: jeonseMinDeposit } });
    }

    if (monthMinDeposit > 0) {
      minConditions.push({ monthDeposit: { $gte: monthMinDeposit } });
    }

    if (minRent > 0) {
      minConditions.push({ monthRent: { $gte: minRent } });
    }

    const filter = minConditions.length > 0 ? { $and: minConditions } : {};

    return await Region.find(filter).lean();
  } catch (error) {
    const err = new Error('지역 데이터를 불러오는 중 오류가 발생했습니다.');
    next(err);
  }
}
