import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const seriesA = {
  data: [3, 12, 7, 15, 8, 0, 11, 4, 6, 9, 1, 10, 5, 2, 14, 3, 7, 13, 4, 8],
  label: "문화시설",
};
const seriesB = {
  data: [3, 12, 7, 15, 8, 0, 11, 4, 6, 9, 1, 10, 5, 2, 14, 3, 7, 13, 4, 8],
  label: "병의원 및 약국",
};

const xAxis = {
  // label: 'Distance between home and office (km)',
  scaleType: "band",
  data: [
    "청운동",
    "신교동",
    "궁정동",
    "효자동",
    "창성동",
    "통의동",
    "적선동",
    "통인동",
    "누상동",
    "누하동",
    "옥인동",
    "체부동",
    "필운동",
    "내자동",
    "사직동",
    "도렴동",
    "당주동",
    "내수동",
    "신문로1가",
    "신문로2가",
  ],
};

export default function Welfare() {
  return (
    <BarChart
      // width={600}
      height={300}
      series={[
        { ...seriesA, stack: "total" },
        { ...seriesB, stack: "total" },
      ]}
      xAxis={[
        {
          ...xAxis,
        },
      ]}
      grid={{ horizontal: true }}
    />
  );
}
