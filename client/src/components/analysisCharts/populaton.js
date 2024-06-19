import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';

export default function Population() {
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/population?perPage=20&pageNo=1&column=youthRate&sorting=desc`
        );
        const data = response.data.paginatedData;
        // console.log(data);
        setPopulationData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartSetting = {
    dataset: populationData,
    height: 300,
    // margin: { bottom: 70 },
    series: [
      {
        label: '청소년층(0~19세)',
        dataKey: 'teenRate',
        stack: 'total'
      },
      {
        label: '청년층(20~34세)',
        dataKey: 'youthRate',
        stack: 'total'
      },
      {
        label: '노년층(65세 이상)',
        dataKey: 'eldRate',
        stack: 'total'
      }
    ],
    xAxis: [
      {
        dataKey: 'dong',
        scaleType: 'band'
        // tickLabelStyle: {
        //   angle: 45,
        //   dominantBaseline: "hanging",
        //   textAnchor: "start",
        // },
        // labelStyle: {
        //   transform: "translateY(15px)",
        // },
      }
    ],
    yAxis: [{ min: 0, max: 100 }]
  };

  return (
    <>
      <h4>&#128106; 나이대별 인구 비율</h4>
      <p>
        청년층 비율은 1위 {populationData[0].gu} {populationData[0].dong}(
        {populationData[0].youthRate}), 2위 {populationData[1].gu}{' '}
        {populationData[1].dong}({populationData[1].youthRate}), 3위{' '}
        {populationData[2].gu} {populationData[0].dong}(
        {populationData[2].youthRate})에 가장 많습니다.
      </p>
      <BarChart {...chartSetting} />
    </>
  );
}
