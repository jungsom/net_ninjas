import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Content from './content';
import Stack from 'react-bootstrap/Stack';

export default function Environment() {
  const [parkData, setParkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/environment?perPage=464&pageNo=1&column=parkRate&sorting=desc`
        );
        // gu, parkRate 값만 추출
        const extractedData = response.data.paginatedData.map((item) => ({
          gu: item.gu,
          parkRate: item.parkRate
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

        // console.log(data);
        setParkData(uniqueData);
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
    dataset: parkData,
    height: 400,
    grid: { horizontal: true },
    series: [
      {
        id: 'series-1',
        dataKey: 'parkRate',
        label: '1인당 공원 면적(m^2/명)',
        highlightScope: {
          highlighted: 'item'
        },
        color: '#00a86b'
      }
    ],
    xAxis: [
      {
        dataKey: 'gu',
        scaleType: 'band'
      }
    ]
  };

  return (
    <>
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>환경</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🌳 1인당 공원 면적(m^2/명)이 가장 넓은 동네는?
          </h5>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {parkData[0].gu} {parkData[0].dong}
            </h3>
            <Content
              boldText={'1인당 공원 면적'}
              text1={
                '은 주거 환경의 질을 높이는 중요한 요소로, 자연과의 밀접한 접촉과 휴식을 즐길 수 있는 기회를 제공합니다.'
              }
              img={'img/analysisCharts/central-park.png'}
              text2={`1인당 공원 면적이 넓은 동네를 찾으시면 ${parkData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={parkData}
            />
          </div>
        </div>
      </Stack>
      {/* <h4>&#127795; 공원</h4>
      <p>
        1인당 공원 면적은 1위 {parkData[0].gu}({parkData[0].parkRate}
        m^2/명), 2위 {parkData[1].gu}({parkData[1].parkRate}m^2/명), 3위{' '}
        {parkData[2].gu}({parkData[2].parkRate}m^2/명)순으로 가장 넓었습니다.
      </p>
      <BarChart {...chartSetting} /> */}
    </>
  );
}
