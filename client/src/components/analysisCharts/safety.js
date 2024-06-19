import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
// import { HighlightedCode } from "@mui/docs/HighlightedCode";
import { BarChart } from '@mui/x-charts/BarChart';

const safety_dataset = [
  {
    gu: '종로구',
    series_1: 3,
    series_2: 4,
    series_3: 4,
    series_4: 4,
    series_5: 4,
    series_6: 18.394
  },
  {
    gu: '중구',
    series_1: 4,
    series_2: 3,
    series_3: 3,
    series_4: 3,
    series_5: 3,
    series_6: 14.723
  },
  {
    gu: '용산구',
    series_1: 1,
    series_2: 1,
    series_3: 1,
    series_4: 1,
    series_5: 1,
    series_6: 21.56
  },
  {
    gu: '성동구',
    series_1: 6,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 7.392
  },
  {
    gu: '광진구',
    series_1: 5,
    series_2: 8,
    series_3: 8,
    series_4: 8,
    series_5: 8,
    series_6: 16.849
  },
  {
    gu: '동대문구',
    series_1: 4,
    series_2: 3,
    series_3: 3,
    series_4: 3,
    series_5: 3,
    series_6: 23.015
  },
  {
    gu: '중랑구',
    series_1: 3,
    series_2: 4,
    series_3: 4,
    series_4: 4,
    series_5: 4,
    series_6: 20.498
  },
  {
    gu: '성북구',
    series_1: 1,
    series_2: 1,
    series_3: 1,
    series_4: 1,
    series_5: 1,
    series_6: 8.123
  },
  {
    gu: '강북구',
    series_1: 5,
    series_2: 6,
    series_3: 6,
    series_4: 6,
    series_5: 6,
    series_6: 19.274
  },
  {
    gu: '도봉구',
    series_1: 8,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 9.857
  },
  {
    gu: '노원구',
    series_1: 6,
    series_2: 4,
    series_3: 4,
    series_4: 4,
    series_5: 4,
    series_6: 24.693
  },
  {
    gu: '은평구',
    series_1: 5,
    series_2: 3,
    series_3: 3,
    series_4: 3,
    series_5: 3,
    series_6: 17.105
  },
  {
    gu: '서대문구',
    series_1: 4,
    series_2: 1,
    series_3: 1,
    series_4: 1,
    series_5: 1,
    series_6: 11.329
  },
  {
    gu: '마포구',
    series_1: 3,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 10.987
  },
  {
    gu: '양천구',
    series_1: 1,
    series_2: 8,
    series_3: 8,
    series_4: 8,
    series_5: 8,
    series_6: 22.481
  },
  {
    gu: '강서구',
    series_1: 5,
    series_2: 6,
    series_3: 6,
    series_4: 6,
    series_5: 6,
    series_6: 12.734
  },
  {
    gu: '구로구',
    series_1: 4,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 13.829
  },
  {
    gu: '금천구',
    series_1: 1,
    series_2: 4,
    series_3: 4,
    series_4: 4,
    series_5: 4,
    series_6: 15.374
  },
  {
    gu: '영등포구',
    series_1: 6,
    series_2: 3,
    series_3: 3,
    series_4: 3,
    series_5: 3,
    series_6: 25.001
  },
  {
    gu: '동작구',
    series_1: 5,
    series_2: 1,
    series_3: 1,
    series_4: 1,
    series_5: 1,
    series_6: 8.654
  },
  {
    gu: '관악구',
    series_1: 4,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 14.983
  },
  {
    gu: '서초구',
    series_1: 5,
    series_2: 4,
    series_3: 4,
    series_4: 4,
    series_5: 4,
    series_6: 18.726
  },
  {
    gu: '강남구',
    series_1: 4,
    series_2: 1,
    series_3: 1,
    series_4: 1,
    series_5: 1,
    series_6: 7.891
  },
  {
    gu: '송파구',
    series_1: 3,
    series_2: 6,
    series_3: 6,
    series_4: 6,
    series_5: 6,
    series_6: 19.541
  },
  {
    gu: '강동구',
    series_1: 1,
    series_2: 5,
    series_3: 5,
    series_4: 5,
    series_5: 5,
    series_6: 21.732
  }
];

const chartSetting = {
  dataset: safety_dataset,
  height: 400,
  grid: { horizontal: true },
  series: [
    {
      id: 'series-1',
      dataKey: 'series_1',
      label: '살인',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      id: 'series-2',
      dataKey: 'series_2',
      label: '강도',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      id: 'series-3',
      dataKey: 'series_3',
      label: '강간',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      id: 'series-4',
      dataKey: 'series_4',
      label: '절도',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      id: 'series-5',
      dataKey: 'series_5',
      label: '폭력',
      stack: 'total',
      highlightScope: {
        highlighted: 'item'
      }
    },
    {
      id: 'series-6',
      dataKey: 'series_6',
      label: '인구 1000명 당 범죄 발생수',
      highlightScope: {
        highlighted: 'item'
      },
      color: '#fdb462'
    }
  ],
  xAxis: [
    {
      id: 'axis1',
      dataKey: 'gu',
      scaleType: 'band'
    }
  ]
};

export default function Safety() {
  return <BarChart {...chartSetting} />;
}
