import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Welfare() {
  const [cultureData, setCultureData] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState('culture');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cultureResponse = await axios.get(
          `http://localhost:8080/allResearch/welfare?perPage=20&pageNo=1&column=cultureCount&sorting=desc`
        );
        const medicalResponse = await axios.get(
          `http://localhost:8080/allResearch/welfare?perPage=20&pageNo=1&column=medicalCount&sorting=desc`
        );
        // console.log(cultureResponse.data.paginatedData);
        // console.log(medicalResponse.data.paginatedData);
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
    dataset: selectedDataset === 'culture' ? cultureData : medicalData,
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
      <button onClick={() => setSelectedDataset('culture')}>Culture</button>
      <button onClick={() => setSelectedDataset('medical')}>Medical</button>
      <BarChart {...chartSetting} />
    </>
  );
}
