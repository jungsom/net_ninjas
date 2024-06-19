import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import CustomOverlay from './skeleton';

import { useContext } from 'react'; // useContext, TotalContext, useNavigate 공통으로 선언
import TotalContext from '../total/TotalContext';
import { useNavigate } from 'react-router';

export default function Education() {
  const [academyData, setAcademyData] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setKeyword, setPage, setSort, setSortColumn } =
    useContext(TotalContext); // 이 부분 다른 항목에도 붙여넣기
  const navigate = useNavigate(); // 여기도

  function MoveToTable(guName) {
    // 이동하는 함수, 버튼 onClick에 붙일 것
    setKeyword(guName);
    setPage(1);
    setSort('');
    setSortColumn('');
    navigate('/Total');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academyResponse = await baseAxios.get(
          `/allResearch/education?perPage=464&pageNo=1&column=academyCount&sorting=desc`
        );
        const libraryResponse = await baseAxios.get(
          `/allResearch/education?perPage=20&pageNo=1&column=libraryCount&sorting=desc`
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

  if (loading) return <CustomOverlay />;
  if (error) return <div>Error: {error.message}</div>;

  const valueFormatter = (value) => `${value}`;

  const academyChartSetting = {
    dataset: academyData,
    legend: { hidden: true },
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
    legend: { hidden: true },
    height: 300,
    grid: { horizontal: true },
    // sx: {
    //   [`& .${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translateX(-10px)'
    //   }
    // },
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
      <h1>교육</h1>
      <h4>&#127979; 평생직업 교육학원</h4>
      <p>
        평생직업 교육학원은 1위 {academyData[0].gu}(
        {academyData[0].academyCount}), 2위 {academyData[1].gu}(
        {academyData[1].academyCount}), 3위 {academyData[2].gu}(
        {academyData[2].academyCount})에 가장 많았습니다.
      </p>
      <button onClick={() => MoveToTable(academyData[0].gu)}>
        {academyData[0].gu} 더 알아보러 가기
      </button>
      <BarChart {...academyChartSetting} />
      <h4>&#128218; 공공도서관</h4>
      <p>
        공공도서관은 1위 {libraryData[0].gu} {libraryData[0].dong}(
        {libraryData[0].libraryCount}), 2위 {libraryData[1].gu}{' '}
        {libraryData[1].dong}({libraryData[1].libraryCount}), 3위{' '}
        {libraryData[2].gu} {libraryData[2].dong}({libraryData[2].libraryCount}
        )에 가장 많았습니다.
      </p>
      <p>*상위 20개 동만 표시됩니다.</p>
      <BarChart {...libraryChartSetting} />
    </>
  );
}
