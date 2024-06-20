import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Content from './content';
import Stack from 'react-bootstrap/Stack';

export default function Transportation() {
  const [busStationData, setBusStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/transportation?perPage=20&pageNo=1&column=busStation&sorting=desc`
        );
        const data = response.data.paginatedData;
        // console.log(data);
        setBusStationData(data);
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

  const valueFormatter = (value) => `${value}`;

  const chartSetting = {
    dataset: busStationData,
    legend: { hidden: true },
    height: 300,
    //   yAxis: [{ label: "rainfall (mm)" }],
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)'
      }
    },
    series: [
      {
        dataKey: 'busStation',
        label: '버스 정류장 수',
        valueFormatter
      }
    ],
    xAxis: [
      {
        scaleType: 'band',
        dataKey: 'dong'
        //   valueFormatter: (month, context) =>
        //     context.location === "tick"
        //       ? `${month.slice(0, 3)} \n2023`
        //       : `${month} 2023`,
      }
    ]
  };

  return (
    <>
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>교통</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🚏 버스 정류장이 가장 많은 동네는?
          </h5>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {busStationData[0].gu} {busStationData[0].dong}
            </h3>
            <Content
              boldText={'버스 정류장'}
              text1={
                '은 대중교통의 핵심 요소로, 시민들이 편리하게 이동할 수 있도록 도와줍니다.'
              }
              img={'img/analysisCharts/bus-stop.png'}
              text2={`대중교통을 자주 이용하시거나 교통 편의성이 중요한 분이라면 ${busStationData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={busStationData}
            />
          </div>
        </div>
      </Stack>
    </>
  );
}
