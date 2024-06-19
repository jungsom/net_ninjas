import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';

export default function Environment() {
  const [parkData, setParkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/Environment?perPage=464&pageNo=1&column=parkRate&sorting=desc`
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
        color: '#fdb462'
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
      <h4>&#127795; 공원</h4>
      <p>
        1인당 공원 면적은 1위 {parkData[0].gu}({parkData[0].parkRate}
        m^2/명), 2위 {parkData[1].gu}({parkData[1].parkRate}m^2/명), 3위{' '}
        {parkData[2].gu}({parkData[2].parkRate}m^2/명)순으로 가장 넓었습니다.
      </p>
      <BarChart {...chartSetting} />
    </>
  );
}
