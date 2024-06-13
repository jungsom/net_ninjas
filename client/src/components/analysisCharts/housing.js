import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Housing() {
  const [jeonseDepositData, setJeonseDepositData] = useState(null);
  const [monthDepositData, setMonthDepositData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState('jeonseDeposit');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/allResearch/housing?perPage=464`
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
      <button onClick={() => setSelectedDataset('jeonseDeposit')}>
        전세 보증금
      </button>
      <button onClick={() => setSelectedDataset('monthDeposit')}>
        월세 보증금
      </button>
      <BarChart {...chartSetting} />
    </>
  );
}
