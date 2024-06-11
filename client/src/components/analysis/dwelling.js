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
      id: "series-6",
      data: [
        45433, 29101, 72345, 61890, 55012, 83456, 38901, 67321, 72356, 59012,
        45678, 82345, 67123, 51234, 89012, 36789, 43210, 65432, 78345, 74567,
      ],
      label: "전세 보증금(평균)",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-1",
      data: [
        19234.567, 8102.345, 15367.891, 27890.123, 12456.789, 23210.987,
        4589.012, 9387.654, 22100.123, 17654.321, 29345.678, 5601.234,
        18976.543, 20789.012, 28345.678, 12098.765, 29987.654, 4978.901,
        26890.123, 6789.012,
      ],
      label: "월세 보증금(평균)",
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-2",
      data: [
        144.567, 255.678, 63.789, 91.234, 280.123, 210.987, 180.012, 222.345,
        99.123, 176.543, 199.678, 133.234, 276.012, 50.345, 240.678, 290.876,
        81.901, 202.123, 111.234, 79.012,
      ],
      label: "월세 임대료(평균)",
      stack: "total",
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
