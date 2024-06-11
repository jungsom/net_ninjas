import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

// 인구 수
const seriesA = {
  data: [
    8423, 9583, 9012, 8765, 9999, 8123, 9432, 8601, 9786, 8543, 8923, 8444,
    9210, 8375, 8654, 8967, 8790, 9487, 8309, 9642,
  ],
  label: "청소년층(0~19세)",
};
const seriesB = {
  data: [
    8423, 9583, 9012, 8765, 9999, 8123, 9432, 8601, 9786, 8543, 8923, 8444,
    9210, 8375, 8654, 8967, 8790, 9487, 8309, 9642,
  ],
  label: "청년층(20~34세)",
};
const seriesC = {
  data: [
    8423, 9583, 9012, 8765, 9999, 8123, 9432, 8601, 9786, 8543, 8923, 8444,
    9210, 8375, 8654, 8967, 8790, 9487, 8309, 9642,
  ],
  label: "노년층(65세 이상)",
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

// 인구 수 백분율
const commonTransportation = [
  6.5, 12.5, 17.2, 19.6, 20.1, 20.0, 19.5, 18.8, 18.2, 17.3, 16.4, 15.9, 15.2,
  14.7, 14.3, 14.3, 14.3, 14.1, 14.2, 14.2, 14.0, 13.8, 13.8, 13.9, 13.6, 14.0,
  14.9, 14.8, 15.2, 21.1,
];

const car = [
  48.8, 56.3, 63.2, 67.3, 70.2, 72.3, 74.1, 75.8, 76.9, 78.4, 79.7, 80.5, 81.5,
  82.4, 83.0, 83.1, 83.2, 83.6, 83.6, 83.8, 83.9, 84.3, 84.4, 84.4, 84.6, 84.4,
  83.6, 83.9, 83.6, 77.6,
];

const motorcycle = [
  48.8, 56.3, 63.2, 67.3, 70.2, 72.3, 74.1, 75.8, 76.9, 78.4, 79.7, 80.5, 81.5,
  82.4, 83.0, 83.1, 83.2, 83.6, 83.6, 83.8, 83.9, 84.3, 84.4, 84.4, 84.6, 84.4,
  83.6, 83.9, 83.6, 77.6,
];

const series = [
  { label: "청소년층(0~19세)", data: car, stack: "total" },
  { label: "청년층(20~34세)", data: commonTransportation, stack: "total" },
  { label: "노년층(65세 이상)", data: motorcycle, stack: "total" },
];

export default function Welfare() {
  return (
    <>
      <BarChart
        // width={600}
        height={300}
        series={[
          { ...seriesA, stack: "total" },
          { ...seriesB, stack: "total" },
          { ...seriesC, stack: "total" },
        ]}
        xAxis={[
          {
            ...xAxis,
          },
        ]}
        grid={{ horizontal: true }}
      />
      <Box sx={{ overflow: "auto", py: 2 }}>
        <BarChart
          // width={700}
          height={300}
          xAxis={[
            {
              ...xAxis,
              // tickLabelStyle: {
              //   angle: 45,
              //   dominantBaseline: "hanging",
              //   textAnchor: "start",
              // },
              // labelStyle: {
              //   transform: "translateY(15px)",
              // },
            },
          ]}
          yAxis={[{ min: 0, max: 100 }]}
          series={series}
          margin={{ bottom: 70 }}
        />
      </Box>
    </>
  );
}
