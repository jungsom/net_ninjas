import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Education() {
  const [academyData, setAcademyData] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academyResponse = await axios.get(
          `http://localhost:8080/allResearch/education?perPage=464&pageNo=1&column=academyCount&sorting=desc`
        );
        const libraryResponse = await axios.get(
          `http://localhost:8080/allResearch/education?perPage=20&pageNo=1&column=libraryCount&sorting=desc`
        );

        // gu, academyCount 값만 추출
        const extractedData = academyResponse.data.paginatedData.map(
          (item) => ({
            gu: item.gu,
            academyCount: item.academyCount
          })
        );
        // gu 값이 중복된 객체 제거
        const uniqueData = extractedData.reduce((acc, current) => {
          const x = acc.find((item) => item.gu === current.gu);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setAcademyData(uniqueData);

        setLibraryData(libraryResponse.data.paginatedData);
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

  const academyChartSetting = {
    dataset: academyData,
    height: 300,
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)'
      }
    },
    series: [
      {
        dataKey: 'academyCount',
        label: '평생직업 교육학원 수',
        color: '#fdb462',
        valueFormatter
      }
    ],
    xAxis: [
      {
        dataKey: 'gu',
        scaleType: 'band'
        //   valueFormatter: (month, context) =>
        //     context.location === "tick"
        //       ? `${month.slice(0, 3)} \n2023`
        //       : `${month} 2023`,
      }
    ]
    //   yAxis: [{ label: "rainfall (mm)" }],
  };

  const libraryChartSetting = {
    dataset: libraryData,
    height: 300,
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)'
      }
    },
    series: [
      {
        dataKey: 'libraryCount',
        label: '공공도서관 수',
        // color: '#fdb462',
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
    //   yAxis: [{ label: "rainfall (mm)" }],
  };

  return (
    <>
      <BarChart {...academyChartSetting} />
      <BarChart {...libraryChartSetting} />
    </>
  );
}
