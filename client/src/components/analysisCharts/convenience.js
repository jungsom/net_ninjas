import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Stack from 'react-bootstrap/Stack';
import Content from './content';

export default function Convenience() {
  const [supermarketData, setSupermarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/convenience?perPage=464&pageNo=1&column=supermarket&sorting=desc`
        );

        // gu, supermaket 값만 추출
        const extractedData = response.data.paginatedData.map((item) => ({
          gu: item.gu,
          supermarket: item.supermarket
        }));

        // gu 값이 중복된 객체 제거
        const uniqueData = extractedData.reduce((acc, current) => {
          const x = acc.find((item) => item.gu === current.gu);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        console.log(uniqueData);
        setSupermarketData(uniqueData);
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
    dataset: supermarketData,
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
        dataKey: 'supermarket',
        label: '대형마트 수',
        color: '#66B3FF'
      }
    ],
    xAxis: [
      {
        scaleType: 'band',
        dataKey: 'gu'
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
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>편의</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🛒 대형마트가 가장 많은 자치구는?
          </h5>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {supermarketData[0].gu} {supermarketData[0].dong}
            </h3>
            <Content
              boldText={'대형마트'}
              text1={
                '는 다양한 상품을 저렴한 가격에 구매할 수 있는 장소로, 주거지 선택 시 편리성을 높이는 요소 중 하나입니다.'
              }
              img={'img/analysisCharts/supermarket.png'}
              text2={`대형마트가 많이 위치한 동네를 찾으시면 ${supermarketData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={supermarketData}
            />
          </div>
        </div>
      </Stack>
      {/* <h4>&#127978; 대형마트</h4>
      <p>
        대형마트는 1위 {supermarketData[0].gu}({supermarketData[0].supermarket}
        ), 2위 {supermarketData[1].gu}({supermarketData[1].supermarket}), 3위{' '}
        {supermarketData[2].gu}({supermarketData[2].supermarket}
        )에 가장 많았습니다.
      </p>
      <BarChart {...chartSetting} /> */}
    </>
  );
}
