import React, { useState, useEffect } from 'react';
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
// import { HighlightedCode } from "@mui/docs/HighlightedCode";
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function Safety() {
  const [totalData, setTotalData] = useState(null);
  const [crimeRateData, setCrimeRateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [sort, setSort] = React.useState('line');
  const [selectedDataset, setSelectedDataset] = useState('total');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await axios.get(
          `http://localhost:8080/allResearch/safety?perPage=464&pageNo=1&column=crimeRate&sorting=asc`
        );
        const crimeRateResponse = await axios.get(
          `http://localhost:8080/allResearch/safety?perPage=464&pageNo=1&column=crimeRate&sorting=asc`
        );
        // dong 제외한 모든 값 추출
        const extractedData = totalResponse.data.paginatedData.map((item) => ({
          gu: item.gu,
          crimeRate: item.crimeRate,
          murder: item.murder,
          robbery: item.robbery,
          rape: item.rape,
          theft: item.theft,
          violence: item.violence
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
        setTotalData(uniqueData);
        setCrimeRateData(uniqueData);
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
    dataset: selectedDataset === 'total' ? totalData : crimeRateData,
    height: 400,
    grid: { horizontal: true },
    series:
      selectedDataset === 'total'
        ? [
            {
              id: 'series-1',
              dataKey: 'murder',
              label: '살인',
              stack: 'total',
              highlightScope: {
                highlighted: 'item'
              }
            },
            {
              id: 'series-2',
              dataKey: 'robbery',
              label: '강도',
              stack: 'total',
              highlightScope: {
                highlighted: 'item'
              }
            },
            {
              id: 'series-3',
              dataKey: 'rape',
              label: '강간',
              stack: 'total',
              highlightScope: {
                highlighted: 'item'
              }
            },
            {
              id: 'series-4',
              dataKey: 'theft',
              label: '절도',
              stack: 'total',
              highlightScope: {
                highlighted: 'item'
              }
            },
            {
              id: 'series-5',
              dataKey: 'violence',
              label: '폭력',
              stack: 'total',
              highlightScope: {
                highlighted: 'item'
              }
            }
          ]
        : [
            {
              id: 'series-6',
              dataKey: 'crimeRate',
              label: '인구 1000명 당 범죄 발생수',
              highlightScope: {
                highlighted: 'item'
              },
              color: '#fdb462'
            }
          ],
    xAxis: [
      {
        id: 'axis1',
        dataKey: 'gu',
        scaleType: 'band'
      }
    ]
  };

  return (
    <>
      <h4>&#128680; 범죄 건수 및 1000명당 범죄 발생 수</h4>
      <p>
        범죄 건수가 가장 낮은 곳은 1위 {crimeRateData[0].gu}(
        {crimeRateData[0].crimeRate}), 2위 {crimeRateData[1].gu}(
        {crimeRateData[1].crimeRate}), 3위 {crimeRateData[2].gu}(
        {crimeRateData[2].crimeRate}
        )입니다.
      </p>
      <p>
        1000명당 범죄 발생 수가 가장 낮은 곳은 1위 {crimeRateData[0].gu}(
        {crimeRateData[0].crimeRate}), 2위 {crimeRateData[1].gu}(
        {crimeRateData[1].crimeRate}), 3위 {crimeRateData[2].gu}(
        {crimeRateData[2].crimeRate}
        )입니다.
      </p>
      <TextField
        select
        value={selectedDataset}
        onChange={(event) => setSelectedDataset(event.target.value)}
        label='정렬 기준'
        sx={{ minWidth: 150 }}
      >
        <MenuItem value='total'>범죄 건수 합계</MenuItem>
        <MenuItem value='crimeRate'>1000명 당 범죄 발생수</MenuItem>
      </TextField>
      <BarChart {...chartSetting} />
    </>
  );
}
