import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Welfare() {
  const [totalData, setTotalData] = useState(null);
  const [cultureData, setCultureData] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [sort, setSort] = React.useState('line');
  const [selectedDataset, setSelectedDataset] = useState('total');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await axios.get(
          `http://localhost:8080/allResearch/welfare?perPage=20&pageNo=1&column=welfareTotal&sorting=desc`
        );
        const cultureResponse = await axios.get(
          `http://localhost:8080/allResearch/welfare?perPage=20&pageNo=1&column=cultureCount&sorting=desc`
        );
        const medicalResponse = await axios.get(
          `http://localhost:8080/allResearch/welfare?perPage=20&pageNo=1&column=medicalCount&sorting=desc`
        );
        // console.log(cultureResponse.data.paginatedData);
        // console.log(medicalResponse.data.paginatedData);
        setTotalData(totalResponse.data.paginatedData);
        setCultureData(cultureResponse.data.paginatedData);
        setMedicalData(medicalResponse.data.paginatedData);
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
      selectedDataset === 'total'
        ? totalData
        : selectedDataset === 'culture'
        ? cultureData
        : medicalData,
    // width={600}
    height: 300,
    grid: { horizontal: true },
    series: [
      {
        dataKey: 'cultureCount',
        stack: 'total',
        label: '문화시설'
      },
      {
        dataKey: 'medicalCount',
        stack: 'total',
        label: '병의원 및 약국'
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
      <h4>&#127917; 문화시설 &nbsp;&&nbsp; &#127973; 병의원 및 약국</h4>
      <p>
        문화시설과 병의원 및 약국 총합이 가장 높은 곳은 1위 {totalData[0].gu}{' '}
        {totalData[0].dong}({totalData[0].welfareTotal}), 2위 {totalData[1].gu}{' '}
        {totalData[1].dong}({totalData[1].welfareTotal}), 3위 {totalData[2].gu}{' '}
        {totalData[0].dong}({totalData[2].welfareTotal}
        )입니다.
      </p>
      <p>
        문화시설은 1위 {cultureData[0].gu} {cultureData[0].dong}(
        {cultureData[0].cultureCount}), 2위 {cultureData[1].gu}{' '}
        {cultureData[1].dong}({cultureData[1].cultureCount}), 3위{' '}
        {cultureData[2].gu} {cultureData[0].dong}({cultureData[2].cultureCount}
        )에 가장 많습니다.
      </p>
      <p>
        병의원 및 약국은 1위 {medicalData[0].gu} {medicalData[0].dong}(
        {medicalData[0].medicalCount}), 2위 {medicalData[1].gu}{' '}
        {medicalData[1].dong}({medicalData[1].medicalCount}), 3위{' '}
        {medicalData[2].gu} {medicalData[2].dong}({medicalData[2].medicalCount}
        )에 가장 많습니다.
      </p>
      <TextField
        select
        value={selectedDataset}
        onChange={(event) => setSelectedDataset(event.target.value)}
        label='정렬 기준'
        sx={{ minWidth: 150 }}
      >
        <MenuItem value='total'>합계</MenuItem>
        <MenuItem value='culture'>&#127917; 문화시설</MenuItem>
        <MenuItem value='medical'>&#127973; 병의원 및 약국</MenuItem>
      </TextField>
      {/* <button onClick={() => setSelectedDataset('culture')}>Culture</button>
      <button onClick={() => setSelectedDataset('medical')}>Medical</button> */}
      <BarChart {...chartSetting} />
    </>
  );
}
