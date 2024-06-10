import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const population_dataset = [
  { dong: '청운동', underageRate: 6.5, youthRate: 48.8, seniorRate: 48.8 },
  { dong: '신교동', underageRate: 12.5, youthRate: 56.3, seniorRate: 56.3 },
  { dong: '궁정동', underageRate: 17.2, youthRate: 63.2, seniorRate: 63.2 },
  { dong: '효자동', underageRate: 19.6, youthRate: 67.3, seniorRate: 67.3 },
  { dong: '창성동', underageRate: 20.1, youthRate: 70.2, seniorRate: 70.2 },
  { dong: '통의동', underageRate: 20.0, youthRate: 72.3, seniorRate: 72.3 },
  { dong: '적선동', underageRate: 19.5, youthRate: 74.1, seniorRate: 74.1 },
  { dong: '통인동', underageRate: 18.8, youthRate: 75.8, seniorRate: 75.8 },
  { dong: '누상동', underageRate: 18.2, youthRate: 76.9, seniorRate: 76.9 },
  { dong: '누하동', underageRate: 17.3, youthRate: 78.4, seniorRate: 78.4 },
  { dong: '옥인동', underageRate: 16.4, youthRate: 79.7, seniorRate: 79.7 },
  { dong: '체부동', underageRate: 15.9, youthRate: 80.5, seniorRate: 80.5 },
  { dong: '필운동', underageRate: 15.2, youthRate: 81.5, seniorRate: 81.5 },
  { dong: '내자동', underageRate: 14.7, youthRate: 82.4, seniorRate: 82.4 },
  { dong: '사직동', underageRate: 14.3, youthRate: 83.0, seniorRate: 83.0 },
  { dong: '도렴동', underageRate: 14.3, youthRate: 83.1, seniorRate: 83.1 },
  { dong: '당주동', underageRate: 14.3, youthRate: 83.2, seniorRate: 83.2 },
  { dong: '내수동', underageRate: 14.1, youthRate: 83.6, seniorRate: 83.6 },
  { dong: '신문로1가', underageRate: 14.2, youthRate: 83.6, seniorRate: 83.6 },
  { dong: '신문로2가', underageRate: 14.2, youthRate: 83.8, seniorRate: 83.8 }
];

const chartSetting = {
  dataset: population_dataset,
  height: 300,
  // margin: { bottom: 70 },
  series: [
    {
      label: '청소년층(0~19세)',
      dataKey: 'underageRate',
      stack: 'total'
    },
    {
      label: '청년층(20~34세)',
      dataKey: 'youthRate',
      stack: 'total'
    },
    {
      label: '노년층(65세 이상)',
      dataKey: 'seniorRate',
      stack: 'total'
    }
  ],
  xAxis: [
    {
      dataKey: 'dong',
      scaleType: 'band'
      // tickLabelStyle: {
      //   angle: 45,
      //   dominantBaseline: "hanging",
      //   textAnchor: "start",
      // },
      // labelStyle: {
      //   transform: "translateY(15px)",
      // },
    }
  ],
  yAxis: [{ min: 0, max: 100 }]
};

export default function Population() {
  return <BarChart {...chartSetting} />;
}
