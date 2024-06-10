import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
// import { HighlightedCode } from "@mui/docs/HighlightedCode";
import { BarChart } from '@mui/x-charts/BarChart';

const environment_dataset = [
  { dong: '청운동', parkRate: 4 },
  { dong: '신교동', parkRate: 2 },
  { dong: '궁정동', parkRate: 5 },
  { dong: '효자동', parkRate: 4 },
  { dong: '창성동', parkRate: 1 },
  { dong: '통의동', parkRate: 4 },
  { dong: '적선동', parkRate: 2 },
  { dong: '통인동', parkRate: 5 },
  { dong: '누상동', parkRate: 4 },
  { dong: '누하동', parkRate: 1 },
  { dong: '옥인동', parkRate: 5 },
  { dong: '체부동', parkRate: 4 },
  { dong: '필운동', parkRate: 1 },
  { dong: '내자동', parkRate: 4 },
  { dong: '사직동', parkRate: 2 },
  { dong: '도렴동', parkRate: 5 },
  { dong: '당주동', parkRate: 4 },
  { dong: '내수동', parkRate: 1 },
  { dong: '신문로1가', parkRate: 4 },
  { dong: '신문로2가', parkRate: 2 }
];

const chartSetting = {
  dataset: environment_dataset,
  height: 400,
  grid: { horizontal: true },
  series: [
    {
      id: 'series-1',
      dataKey: 'parkRate',
      label: '1인당 공원 면적',
      highlightScope: {
        highlighted: 'item'
      }
    }
  ],
  xAxis: [
    {
      dataKey: 'dong',
      scaleType: 'band'
    }
  ]
};

export default function Environment() {
  return <BarChart {...chartSetting} />;
}
