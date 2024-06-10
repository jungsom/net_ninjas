import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const welfare_dataset = [
  { dong: '청운동', culture: 3, medical: 3 },
  { dong: '신교동', culture: 12, medical: 12 },
  { dong: '궁정동', culture: 7, medical: 7 },
  { dong: '효자동', culture: 15, medical: 15 },
  { dong: '창성동', culture: 8, medical: 8 },
  { dong: '통의동', culture: 0, medical: 0 },
  { dong: '적선동', culture: 11, medical: 11 },
  { dong: '통인동', culture: 4, medical: 4 },
  { dong: '누상동', culture: 6, medical: 6 },
  { dong: '누하동', culture: 9, medical: 9 },
  { dong: '옥인동', culture: 1, medical: 1 },
  { dong: '체부동', culture: 10, medical: 10 },
  { dong: '필운동', culture: 5, medical: 5 },
  { dong: '내자동', culture: 2, medical: 2 },
  { dong: '사직동', culture: 14, medical: 14 },
  { dong: '도렴동', culture: 3, medical: 3 },
  { dong: '당주동', culture: 7, medical: 7 },
  { dong: '내수동', culture: 13, medical: 13 },
  { dong: '신문로1가', culture: 4, medical: 4 },
  { dong: '신문로2가', culture: 8, medical: 8 }
];

const chartSetting = {
  dataset: welfare_dataset,
  // width={600}
  height: 300,
  grid: { horizontal: true },
  series: [
    {
      dataKey: 'culture',
      stack: 'total',
      label: '문화시설'
    },
    {
      dataKey: 'medical',
      stack: 'total',
      label: '병의원 및 약국'
    }
  ],
  xAxis: [
    {
      dataKey: 'dong',
      scaleType: 'band'
    }
  ]
};

export default function Welfare() {
  return <BarChart {...chartSetting} />;
}
