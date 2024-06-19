import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';

export default function Housing() {
  const [jeonseDepositData, setJeonseDepositData] = useState(null);
  const [monthDepositData, setMonthDepositData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState('jeonseDeposit');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAxios.get(
          `/allResearch/Housing?perPage=464`
        );
        const allData = response.data.paginatedData;

        // jeonseDeposit, monthDeposit 값이 0이 아닌 객체만 추출
        const filteredData = allData.filter(
          (item) => item.jeonseDeposit !== 0 && item.monthDeposit !== 0
        );

        // jeonseDeposit 값 기준 모든 객체 오름차순 정렬
        const jeonseDepositSortedData = filteredData.sort(
          (a, b) => a.jeonseDeposit - b.jeonseDeposit
        );
        // 상위 20개 동만 추출
        const jeonseDepositLimitedData = jeonseDepositSortedData.slice(0, 20);
        setJeonseDepositData(jeonseDepositLimitedData);

        // monthDeposit 값 기준 모든 객체 오름차순 정렬
        const monthDepositSortedData = filteredData.sort(
          (a, b) => a.monthDeposit - b.monthDeposit
        );
        // 상위 20개 동만 추출
        const monthDepositLimitedData = monthDepositSortedData.slice(0, 20);
        setMonthDepositData(monthDepositLimitedData);

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
    dataset:
      selectedDataset === 'jeonseDeposit'
        ? jeonseDepositData
        : monthDepositData,
    height: 400,
    grid: { horizontal: true },
    series: [
      {
        dataKey: 'jeonseDeposit',
        label: '전세 보증금(평균)',
        highlightScope: {
          highlighted: 'item'
        }
      },
      {
        dataKey: 'monthDeposit',
        label: '월세 보증금(평균)',
        stack: 'total',
        highlightScope: {
          highlighted: 'item'
        }
      },
      {
        dataKey: 'monthRent',
        label: '월세 임대료(평균)',
        stack: 'total',
        highlightScope: {
          highlighted: 'item'
        }
      }
    ],
    xAxis: [
      {
        dataKey: 'dong',
        scaleType: 'band'
      }
    ]
  };

  return (
    <>
      <h4>&#127968; 전월세 금액</h4>
      <p>
        전세 금액이 가장 싼 곳은 1위 {jeonseDepositData[0].gu}{' '}
        {jeonseDepositData[0].dong}({jeonseDepositData[0].jeonseDeposit}만원),
        2위 {jeonseDepositData[1].gu} {jeonseDepositData[1].dong}(
        {jeonseDepositData[1].jeonseDeposit}만원), 3위 {jeonseDepositData[2].gu}{' '}
        {jeonseDepositData[0].dong}({jeonseDepositData[2].jeonseDeposit}
        만원)입니다.
      </p>
      <p>
        월세 금액이 가장 싼 곳은 1위 {monthDepositData[0].gu}{' '}
        {monthDepositData[0].dong}({monthDepositData[0].monthDeposit}만원), 2위{' '}
        {monthDepositData[1].gu} {monthDepositData[1].dong}(
        {monthDepositData[1].monthDeposit}만원), 3위 {monthDepositData[2].gu}{' '}
        {monthDepositData[0].dong}({monthDepositData[2].monthDeposit}
        만원)입니다.
      </p>
      <TextField
        select
        value={selectedDataset}
        onChange={(event) => setSelectedDataset(event.target.value)}
        label='정렬 기준'
        sx={{ minWidth: 150 }}
      >
        <MenuItem value='jeonseDeposit'>전세 보증금</MenuItem>
        <MenuItem value='monthDeposit'>월세 보증금</MenuItem>
      </TextField>
      {/* <button onClick={() => setSelectedDataset('jeonseDeposit')}>
        전세 보증금
      </button>
      <button onClick={() => setSelectedDataset('monthDeposit')}>
        월세 보증금
      </button> */}
      <BarChart {...chartSetting} />
    </>
  );
}
