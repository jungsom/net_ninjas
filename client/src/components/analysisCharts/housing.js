import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Content from './content';
import Stack from 'react-bootstrap/Stack';

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
          `/allResearch/housing?perPage=464`
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

  const valueFormatter = (value) => `${value}만원`;

  const chartSetting = {
    dataset:
      selectedDataset === 'jeonseDeposit'
        ? jeonseDepositData
        : monthDepositData,
    height: 300,
    grid: { horizontal: true },
    series: [
      {
        dataKey: 'jeonseDeposit',
        label: '전세 보증금(평균)',
        highlightScope: {
          highlighted: 'item'
        },
        valueFormatter
      },
      {
        dataKey: 'monthDeposit',
        label: '월세 보증금(평균)',
        stack: 'total',
        highlightScope: {
          highlighted: 'item'
        },
        valueFormatter
      },
      {
        dataKey: 'monthRent',
        label: '월세 임대료(평균)',
        stack: 'total',
        highlightScope: {
          highlighted: 'item'
        },
        valueFormatter
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
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>주거</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🏠 전세 보증금 혹은 월세 임대료가 가장 낮은 동네는?
          </h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
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
          </div>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              전세 보증금(평균)이 가장 낮은 동네는 {jeonseDepositData[0].gu}{' '}
              {jeonseDepositData[0].dong}
            </h3>
            <Content
              boldText={'전세 보증금'}
              text1={
                '은 장기 임대 시에 지불하는 보증금으로, 일시적인 지출이 크지만 장기적으로는 집을 보유할 수 있는 장점이 있습니다.'
              }
              img={'img/analysisCharts/building.png'}
              text2={`전세 보증금이 낮은 동네를 찾으시면 ${jeonseDepositData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={jeonseDepositData}
            />
          </div>
          <div style={{ marginTop: '2%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              월세 임대료(평균)이 가장 낮은 동네는 {monthDepositData[0].gu}{' '}
              {monthDepositData[0].dong}
            </h3>
            <Content
              boldText={'월세 임대료'}
              text1={
                '는 매달 지불하는 주거 비용으로, 초기 비용 부담이 적고 유동적인 주거를 할 수 있는 장점이 있습니다.'
              }
              img={'img/analysisCharts/house.png'}
              text2={`월세 임대료가 낮은 동네를 찾으시면 ${monthDepositData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={monthDepositData}
            />
          </div>
        </div>
      </Stack>
      {/* <h4>&#127968; 전월세 금액</h4>
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
    </>
  );
}
