import * as React from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  height: 300,
  //   yAxis: [{ label: "rainfall (mm)" }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const busstop_dataset = [
  {
    count: 400,
    gu: "청운동",
  },
  {
    count: 110,
    gu: "신교동",
  },
  {
    count: 340,
    gu: "궁정동",
  },
  {
    count: 90,
    gu: "효자동",
  },
  {
    count: 42,
    gu: "창성동",
  },
  {
    count: 123,
    gu: "통의동",
  },
  {
    count: 123,
    gu: "적선동",
  },
  {
    count: 234,
    gu: "통인동",
  },
  {
    count: 453,
    gu: "누상동",
  },
  {
    count: 123,
    gu: "누하동",
  },
  {
    count: 32,
    gu: "옥인동",
  },
  {
    count: 234,
    gu: "체부동",
  },
  {
    count: 323,
    gu: "필운동",
  },
  {
    count: 400,
    gu: "내자동",
  },
  {
    count: 400,
    gu: "사직동",
  },
  {
    count: 400,
    gu: "도렴동",
  },
  {
    count: 400,
    gu: "당주동",
  },
  {
    count: 400,
    gu: "내수동",
  },
  {
    count: 400,
    gu: "신문로1가",
  },
  {
    count: 400,
    gu: "신문로2가",
  },
];

const valueFormatter = (value) => `${value}개`;

export default function Traffic() {
  return (
    <>
      <BarChart
        dataset={busstop_dataset}
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
            label: "버스 정류장 수",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </>
  );
}
