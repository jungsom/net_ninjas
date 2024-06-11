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
        9234.567, 8123.678, 3456.789, 8910.234, 6780.123, 4321.987, 5432.012,
        9876.345, 1234.123, 4567.543, 7890.678, 5678.234, 9012.012, 6789.345,
        2345.678, 8901.876, 4567.901, 2345.123, 7890.234, 123.012,
      ],
      label: "공원 면적",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-6",
      data: [4, 2, 5, 4, 1, 4, 2, 5, 4, 1, 5, 4, 1, 4, 2, 5, 4, 1, 4, 2],
      label: "인구 1인당 공원면적(m^2/명)",
      highlightScope: {
        highlighted: "item",
      },
    },
  ],
  xAxis: [
    {
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
      scaleType: "band",
      id: "axis1",
    },
  ],
  height: 400,
};

export default function Environment() {
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0, md: 4 }}
        sx={{ width: "100%" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <BarChart {...barChartsParams} />
        </Box>
      </Stack>
    </>
  );
}
