import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import baseAxios from '../shared/api';
import Stack from 'react-bootstrap/Stack';
import { useContext } from 'react'; // useContext, TotalContext, useNavigate 공통으로 선언
import TotalContext from '../total/TotalContext';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Content from './content';

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
        const totalResponse = await baseAxios.get(
          `/allResearch/welfare?perPage=20&pageNo=1&column=welfareTotal&sorting=desc`
        );
        const cultureResponse = await baseAxios.get(
          `/allResearch/welfare?perPage=20&pageNo=1&column=cultureCount&sorting=desc`
        );
        const medicalResponse = await baseAxios.get(
          `/allResearch/Welfare?perPage=20&pageNo=1&column=medicalCount&sorting=desc`
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
      <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>복지</h2>
        <div>
          <h5 style={{ color: '#5fc3c8', fontWeight: 'bold' }}>
            🏛️ 문화 시설과 🏥 병원 및 약국이 가장 많은 동네는?
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
              <MenuItem value='total'>합계</MenuItem>
              <MenuItem value='culture'>&#127917; 문화시설</MenuItem>
              <MenuItem value='medical'>&#127973; 병의원 및 약국</MenuItem>
            </TextField>
          </div>
          <BarChart {...chartSetting} />
          <div style={{ marginTop: '3%' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              🏛️ 문화 시설 1위 {cultureData[0].gu} {cultureData[0].dong}
            </h3>
            <Content
              boldText={'문화 시설'}
              text1={
                '은 도시 생활의 품질을 높이는 중요한 요소입니다. 예술 갤러리, 박물관, 극장 등 다양한 문화 시설이 있는 지역은 주민들에게 다양한 문화 활동의 기회를 제공합니다.'
              }
              img={'img/analysisCharts/theater.png'}
              text2={`문화와 예술에 관심이 많으신 분이라면 ${cultureData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={cultureData}
            />
          </div>
          <div style={{ marginTop: '2%' }}>
            <h3>
              🏥 병원 및 약국 1위 {medicalData[0].gu} {medicalData[0].dong}
            </h3>
            <Content
              boldText={'병원과 약국'}
              text1={
                '은 건강 관리를 위해 중요한 인프라입니다. 많은 병원과 약국이 있는 지역은 응급 상황에 빠르게 대응할 수 있고 건강 서비스에 접근하기 쉬운 환경을 제공합니다.'
              }
              img={'img/analysisCharts/hospital.png'}
              text2={`건강 관리와 병원 접근성이 중요하신 분이라면 ${medicalData[0].gu}에 대해 더 알아보는건 어떨까요?`}
              data={medicalData}
            />
          </div>
        </div>
      </Stack>
      {/* <Stack gap={5} style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>복지</h2>
        <Content
          title={'🏛️ 문화 시설과 🏥 병원 및 약국이 가장 많은 동네는?'}
          chartSetting={chartSetting}
          boldText={'문화 시설'}
          text1={
            '은 대중교통의 핵심 요소로, 시민들이 편리하게 이동할 수 있도록 도와줍니다.'
          }
          img={'img/analysisCharts/theater.png'}
          text2={`대중교통을 자주 이용하시거나 교통 편의성이 중요한 분이라면 ${totalData[0].gu}에 대해 더 알아보는건 어떨까요?`}
          data={totalData}
        />
      </Stack> */}
      {/* <h4>&#127917; 문화시설 &nbsp;&&nbsp; &#127973; 병의원 및 약국</h4>
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
    </>
  );
}
