import * as React from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';

const academy_dataset = [
  {
    count: 400,
    gu: '강남구'
  },
  {
    count: 110,
    gu: '강동구'
  },
  {
    count: 340,
    gu: '강북구'
  },
  {
    count: 90,
    gu: '강서구'
  },
  {
    count: 42,
    gu: '관악구'
  },
  {
    count: 123,
    gu: '광진구'
  },
  {
    count: 123,
    gu: '구로구'
  },
  {
    count: 234,
    gu: '금천구'
  },
  {
    count: 453,
    gu: '노원구'
  },
  {
    count: 123,
    gu: '도봉구'
  },
  {
    count: 32,
    gu: '동대문구'
  },
  {
    count: 234,
    gu: '동작구'
  },
  {
    count: 323,
    gu: '마포구'
  },
  {
    count: 400,
    gu: '서대문구'
  },
  {
    count: 400,
    gu: '서초구'
  },
  {
    count: 400,
    gu: '성동구'
  },
  {
    count: 400,
    gu: '성북구'
  },
  {
    count: 400,
    gu: '송파구'
  },
  {
    count: 400,
    gu: '양천구'
  },
  {
    count: 400,
    gu: '영등포구'
  },
  {
    count: 400,
    gu: '용산구'
  },
  {
    count: 400,
    gu: '은평구'
  },
  {
    count: 400,
    gu: '종로구'
  },
  {
    count: 400,
    gu: '중구'
  },
  {
    count: 400,
    gu: '중랑구'
  }
];

const library_dataset = [
  {
    count: 400,
    gu: '청운동'
  },
  {
    count: 110,
    gu: '신교동'
  },
  {
    count: 340,
    gu: '궁정동'
  },
  {
    count: 90,
    gu: '효자동'
  },
  {
    count: 42,
    gu: '창성동'
  },
  {
    count: 123,
    gu: '통의동'
  },
  {
    count: 123,
    gu: '적선동'
  },
  {
    count: 234,
    gu: '통인동'
  },
  {
    count: 453,
    gu: '누상동'
  },
  {
    count: 123,
    gu: '누하동'
  },
  {
    count: 32,
    gu: '옥인동'
  },
  {
    count: 234,
    gu: '체부동'
  },
  {
    count: 323,
    gu: '필운동'
  },
  {
    count: 400,
    gu: '내자동'
  },
  {
    count: 400,
    gu: '사직동'
  },
  {
    count: 400,
    gu: '도렴동'
  },
  {
    count: 400,
    gu: '당주동'
  },
  {
    count: 400,
    gu: '내수동'
  },
  {
    count: 400,
    gu: '신문로1가'
  },
  {
    count: 400,
    gu: '신문로2가'
  }
];

const valueFormatter = (value) => `${value}`;

const academyChartSetting = {
  dataset: academy_dataset,
  height: 300,
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)'
    }
  },
  series: [
    {
      dataKey: 'count',
      label: '평생직업 교육학원 수',
      color: '#fdb462',
      valueFormatter
    }
  ],
  xAxis: [
    {
      dataKey: 'gu',
      scaleType: 'band'
      //   valueFormatter: (month, context) =>
      //     context.location === "tick"
      //       ? `${month.slice(0, 3)} \n2023`
      //       : `${month} 2023`,
    }
  ]
  //   yAxis: [{ label: "rainfall (mm)" }],
};

const libraryChartSetting = {
  dataset: library_dataset,
  height: 300,
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)'
    }
  },
  series: [
    {
      dataKey: 'count',
      label: '공공도서관 수',
      // color: '#fdb462',
      valueFormatter
    }
  ],
  xAxis: [
    {
      scaleType: 'band',
      dataKey: 'gu'
      //   valueFormatter: (month, context) =>
      //     context.location === "tick"
      //       ? `${month.slice(0, 3)} \n2023`
      //       : `${month} 2023`,
    }
  ]
  //   yAxis: [{ label: "rainfall (mm)" }],
};

export default function Education() {
  return (
    <>
      <BarChart {...academyChartSetting} />
      <BarChart {...libraryChartSetting} />
    </>
  );
}
