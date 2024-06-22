import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import CustomOverlay from './skeleton';
import Stack from 'react-bootstrap/Stack';
import Content from './content';

import { useContext } from 'react'; // useContext, TotalContext, useNavigate 공통으로 선언
import TotalStatisticsContext from '../totalStatistics/TotalStatisticsContext';
import { useNavigate } from 'react-router';

export default function Education() {
  const [academyData, setAcademyData] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setKeyword, setPage, setSort, setSortColumn } = useContext(
    TotalStatisticsContext
  ); // 이 부분 다른 항목에도 붙여넣기
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
        color: '#ee6b6e',
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
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>교육</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🎒 평생직업 교육학원이 가장 많은 자치구는?
          </h5>
          <BarChart {...academyChartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {academyData[0].gu} {academyData[0].dong}
            </h3>
            <Content
              boldText={'평생직업 교육'}
              text1={
                '은 사람들이 평생 동안 직업과 관련된 기술과 지식을 지속적으로 배우고 발전시킬 수 있도록 지원하는 교육입니다.'
              }
              img={'img/analysisCharts/lifelong-learning.png'}
              text2={`재교육 또는 재훈련, 자기개발에 관심이 많으시다면 ${academyData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={academyData}
            />
          </div>
        </div>
        <hr />
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            📚 공공도서관이 가장 많은 동네는?
          </h5>
          <BarChart {...libraryChartSetting} />
          <div style={{ marginTop: '2%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              1위 {libraryData[0].gu} {libraryData[0].dong}
            </h3>
            <Content
              boldText={'공공도서관'}
              text1={
                '은 모든 시민에게 무료 또는 저렴한 비용으로 정보와 자료를 제공하는 공공 기관입니다.'
              }
              img={'img/analysisCharts/library.png'}
              text2={`독서가 취미시거나 친구, 가족과 함께 도서관 방문을 자주 하신다면 ${libraryData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={libraryData}
            />
          </div>
        </div>
      </Stack>
    </>
  );
}
