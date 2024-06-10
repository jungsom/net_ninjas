import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
// import { HighlightedCode } from "@mui/docs/HighlightedCode";
import { BarChart } from '@mui/x-charts/BarChart';

const housing_dataset = [
  {
    dong: '청운동',
    jeonseDeposit: 45433,
    monthDeposit: 19234.567,
    monthRent: 144.567
  },
  {
    dong: '신교동',
    jeonseDeposit: 29101,
    monthDeposit: 8102.345,
    monthRent: 255.678
  },
  {
    dong: '궁정동',
    jeonseDeposit: 72345,
    monthDeposit: 15367.891,
    monthRent: 63.789
  },
  {
    dong: '효자동',
    jeonseDeposit: 61890,
    monthDeposit: 27890.123,
    monthRent: 91.234
  },
  {
    dong: '창성동',
    jeonseDeposit: 55012,
    monthDeposit: 12456.789,
    monthRent: 280.123
  },
  {
    dong: '통의동',
    jeonseDeposit: 83456,
    monthDeposit: 23210.987,
    monthRent: 210.987
  },
  {
    dong: '적선동',
    jeonseDeposit: 38901,
    monthDeposit: 4589.012,
    monthRent: 180.012
  },
  {
    dong: '통인동',
    jeonseDeposit: 67321,
    monthDeposit: 9387.654,
    monthRent: 222.345
  },
  {
    dong: '누상동',
    jeonseDeposit: 72356,
    monthDeposit: 22100.123,
    monthRent: 99.123
  },
  {
    dong: '누하동',
    jeonseDeposit: 59012,
    monthDeposit: 17654.321,
    monthRent: 176.543
  },
  {
    dong: '옥인동',
    jeonseDeposit: 45678,
    monthDeposit: 29345.678,
    monthRent: 199.678
  },
  {
    dong: '체부동',
    jeonseDeposit: 82345,
    monthDeposit: 5601.234,
    monthRent: 133.234
  },
  {
    dong: '필운동',
    jeonseDeposit: 67123,
    monthDeposit: 18976.543,
    monthRent: 276.012
  },
  {
    dong: '내자동',
    jeonseDeposit: 51234,
    monthDeposit: 20789.012,
    monthRent: 50.345
  },
  {
    dong: '사직동',
    jeonseDeposit: 89012,
    monthDeposit: 28345.678,
    monthRent: 240.678
  },
  {
    dong: '도렴동',
    jeonseDeposit: 36789,
    monthDeposit: 12098.765,
    monthRent: 290.876
  },
  {
    dong: '당주동',
    jeonseDeposit: 43210,
    monthDeposit: 29987.654,
    monthRent: 81.901
  },
  {
    dong: '내수동',
    jeonseDeposit: 65432,
    monthDeposit: 4978.901,
    monthRent: 202.123
  },
  {
    dong: '신문로1가',
    jeonseDeposit: 78345,
    monthDeposit: 26890.123,
    monthRent: 111.234
  },
  {
    dong: '신문로2가',
    jeonseDeposit: 74567,
    monthDeposit: 6789.012,
    monthRent: 79.012
  }
];

const chartSetting = {
  dataset: housing_dataset,
  height: 400,
  grid: { horizontal: true },
  series: [
    {
      dataKey: 'jeonseDeposit',
      label: '전세 보증금(평균)',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      dataKey: 'monthDeposit',
      label: '월세 보증금(평균)',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      dataKey: 'monthRent',
      label: '월세 임대료(평균)',
      stack: 'total',
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

export default function Housing() {
  return <BarChart {...chartSetting} />;
}
