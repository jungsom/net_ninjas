import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Content from './content';
import Stack from 'react-bootstrap/Stack';

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
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>인구</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            👦 청년층(20~34세) 비율이 가장 높은 동네는?
          </h5>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {populationData[0].gu} {populationData[0].dong}
            </h3>
            <Content
              boldText={'청년층 비율'}
              text1={
                '이 높은 지역은 경제 활동이 활발하고 산업 및 직장 기회가 많은 경우가 많습니다. 이러한 지역은 청년들이 생활하며 경제적으로 활동할 수 있는 환경을 제공할 수 있습니다.'
              }
              img={'img/analysisCharts/people.png'}
              text2={`직장과 경제 활동이 중요하신 분이라면 ${populationData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={populationData}
            />
          </div>
        </div>
      </Stack>
      {/* <h4>&#128106; 나이대별 인구 비율</h4>
      <p>
        청년층 비율은 1위 {populationData[0].gu} {populationData[0].dong}(
        {populationData[0].youthRate}), 2위 {populationData[1].gu}{' '}
        {populationData[1].dong}({populationData[1].youthRate}), 3위{' '}
        {populationData[2].gu} {populationData[0].dong}(
        {populationData[2].youthRate})에 가장 많습니다.
      </p>
      <BarChart {...chartSetting} /> */}
    </>
  );
}
