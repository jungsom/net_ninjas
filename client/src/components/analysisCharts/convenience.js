import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';

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
        valueFormatter,
        color: '#fdb462'
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
      <h4>&#127978; 대형마트</h4>
      <p>
        대형마트는 1위 {supermarketData[0].gu}({supermarketData[0].supermarket}
        ), 2위 {supermarketData[1].gu}({supermarketData[1].supermarket}), 3위{' '}
        {supermarketData[2].gu}({supermarketData[2].supermarket}
        )에 가장 많았습니다.
      </p>
      <BarChart {...chartSetting} />
    </>
  );
}
