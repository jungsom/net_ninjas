import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";

import { BarChart } from "@mui/x-charts/BarChart";

// import { HighlightedCode } from "@mui/docs/HighlightedCode";

const barChartsParams = {
  series: [
    {
      id: "series-1",
      data: [
        3, 4, 1, 6, 5, 4, 3, 1, 5, 8, 6, 5, 4, 3, 1, 5, 4, 1, 6, 5, 4, 5, 4, 3,
        1, 5,
      ],
      label: "살인",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-2",
      data: [
        4, 3, 1, 5, 8, 3, 4, 1, 6, 5, 4, 3, 1, 5, 8, 6, 5, 4, 3, 1, 5, 4, 1, 6,
        5, 4,
      ],
      label: "강도",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-3",
      data: [
        4, 3, 1, 5, 8, 3, 4, 1, 6, 5, 4, 3, 1, 5, 8, 6, 5, 4, 3, 1, 5, 4, 1, 6,
        5, 4,
      ],
      label: "강간",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-4",
      data: [
        4, 3, 1, 5, 8, 3, 4, 1, 6, 5, 4, 3, 1, 5, 8, 6, 5, 4, 3, 1, 5, 4, 1, 6,
        5, 4,
      ],
      label: "절도",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-5",
      data: [
        4, 3, 1, 5, 8, 3, 4, 1, 6, 5, 4, 3, 1, 5, 8, 6, 5, 4, 3, 1, 5, 4, 1, 6,
        5, 4,
      ],
      label: "폭력",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-6",
      data: [
        18.394, 14.723, 21.56, 7.392, 16.849, 23.015, 20.498, 8.123, 19.274,
        9.857, 24.693, 17.105, 11.329, 10.987, 22.481, 12.734, 13.829, 15.374,
        25.001, 8.654, 14.983, 18.726, 7.891, 19.541, 21.732,
      ],
      label: "인구 1000명 당 범죄 발생수",
      highlightScope: {
        highlighted: "item",
      },
      color: "#fdb462",
    },
  ],
  xAxis: [
    {
      data: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
      scaleType: "band",
      id: "axis1",
    },
  ],
  height: 400,
};

export default function Safety() {
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0, md: 4 }}
        sx={{ width: "100%" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <BarChart grid={{ horizontal: true }} {...barChartsParams} />
        </Box>
      </Stack>
    </>
  );
}
