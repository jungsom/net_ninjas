import React, { useState, useEffect } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Transportation() {
  const [transportationData, setTransportationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/allResearch/transportation?perPage=20&pageNo=1&column=busStation&sorting=desc`
        );
        const data = response.data.paginatedData;
        // console.log(data);
        setTransportationData(data);
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
    dataset: transportationData,
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
        dataKey: 'busStation',
        label: '버스 정류장 수',
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
  };

  return <BarChart {...chartSetting} />;
}
