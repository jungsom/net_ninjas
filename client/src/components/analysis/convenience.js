import * as React from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";

const otherSetting = {
  height: 300,
  //   yAxis: [{ label: "rainfall (mm)" }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const supermarket_dataset = [
  {
    count: 400,
    gu: "강남구",
  },
  {
    count: 110,
    gu: "강동구",
  },
  {
    count: 340,
    gu: "강북구",
  },
  {
    count: 90,
    gu: "강서구",
  },
  {
    count: 42,
    gu: "관악구",
  },
  {
    count: 123,
    gu: "광진구",
  },
  {
    count: 123,
    gu: "구로구",
  },
  {
    count: 234,
    gu: "금천구",
  },
  {
    count: 453,
    gu: "노원구",
  },
  {
    count: 123,
    gu: "도봉구",
  },
  {
    count: 32,
    gu: "동대문구",
  },
  {
    count: 234,
    gu: "동작구",
  },
  {
    count: 323,
    gu: "마포구",
  },
  {
    count: 400,
    gu: "서대문구",
  },
  {
    count: 400,
    gu: "서초구",
  },
  {
    count: 400,
    gu: "성동구",
  },
  {
    count: 400,
    gu: "성북구",
  },
  {
    count: 400,
    gu: "송파구",
  },
  {
    count: 400,
    gu: "양천구",
  },
  {
    count: 400,
    gu: "영등포구",
  },
  {
    count: 400,
    gu: "용산구",
  },
  {
    count: 400,
    gu: "은평구",
  },
  {
    count: 400,
    gu: "종로구",
  },
  {
    count: 400,
    gu: "중구",
  },
  {
    count: 400,
    gu: "중랑구",
  },
];

const valueFormatter = (value) => `${value}개`;

export default function FormatterDemoNoSnap() {
  return (
    <>
      <BarChart
        dataset={supermarket_dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "gu",
            //   valueFormatter: (month, context) =>
            //     context.location === "tick"
            //       ? `${month.slice(0, 3)} \n2023`
            //       : `${month} 2023`,
          },
        ]}
        series={[
          {
            dataKey: "count",
            label: "대형마트 수",
            valueFormatter,
            color: "#fdb462",
          },
        ]}
        {...otherSetting}
      />
    </>
  );
}
