import React, { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
import { useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RecommendContext from './RecommendContext';
import baseAxios from '../shared/api';
import styled from 'styled-components';

const SelectContainer = styled.div`
  width: 600px;
  height: 350px;
  // margin: 40px 0;
  margin-bottom: 10%;
  background-color: transparent;
  background-image: url('${process.env
    .PUBLIC_URL}/img/recommendInput/group18.png');
  background-repeat: no-repeat;
  background-size: 600px;
  background-position: center;
  position: relative; /* Added to allow absolute positioning inside */
`;

const TextOverlay = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black; /* Adjust text color for better visibility */
  font-size: 20px; /* Adjust font size as needed */
  text-align: center;
`;

const Gif = styled.img`
  content: url('${process.env.PUBLIC_URL}/img/result.gif');
  width: 5%;
  padding-bottom: 2%;
`;

export default function RecommendResult() {
  const location = useLocation();
  const {
    firstCategory,
    secondCategory,
    thirdCategory,
    contractType,
    deposit,
    rent,
    recommendData
  } = location.state || {};
  const first = recommendData.first;
  const second = recommendData.second;
  const third = recommendData.third;

  // const [firstFistCategoryRanks, setFirstCategoryRanks] = useState(null);
  // const [secondCategoryRanks, setSecondCategoryRanks] = useState(null);
  // const [thirdCategoryRanks, setThirdCategoryRanks] = useState(null);
  const [firstData, setFirstData] = useState(null);
  const [secondData, setSecondData] = useState(null);
  const [thirdData, setThirdData] = useState(null);

  const [firstFirstCategoryRanks, setFirstFirstCategoryRanks] = useState({});
  const [firstSecondCategoryRanks, setFirstSecondCategoryRanks] = useState({});
  const [firstThridCategoryRanks, setFirstThirdCategoryRanks] = useState({});

  const [secondFirstCategoryRanks, setSecondFirstCategoryRanks] = useState({});
  const [secondSecondCategoryRanks, setSecondSecondCategoryRanks] = useState(
    {}
  );
  const [secondThirdCategoryRanks, setSecondThirdCategoryRanks] = useState({});

  const [thirdFirstCategoryRanks, setThirdFirstCategoryRanks] = useState({});
  const [thirdSecondCategoryRanks, setThirdSecondCategoryRanks] = useState({});
  const [thirdThirdCategoryRanks, setThirdThirdCategoryRanks] = useState({});
  // const { firstCategory, secondCategory, thirdCategory } =
  //   useContext(RecommendContext);
  // const { recommendData } = location.state || {};

  // console.log(firstCategory, secondCategory, thirdCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstResponse = await baseAxios.get(
          `/allResearch/search?keyword=${first[0].dong}`
        );
        const secondResponse = await baseAxios.get(
          `/allResearch/search?keyword=${second[0].dong}`
        );
        const thirdResponse = await baseAxios.get(
          `/allResearch/search?keyword=${third[0].dong}`
        );

        setFirstData(firstResponse.data);
        setSecondData(secondResponse.data);
        setThirdData(thirdResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (firstData && secondData && thirdData) {
      setFirstFirstCategoryRanks(categoryRanks(firstCategory, firstData));
      setFirstSecondCategoryRanks(categoryRanks(secondCategory, firstData));
      setFirstThirdCategoryRanks(categoryRanks(thirdCategory, firstData));

      setSecondFirstCategoryRanks(categoryRanks(firstCategory, secondData));
      setSecondSecondCategoryRanks(categoryRanks(secondCategory, secondData));
      setSecondThirdCategoryRanks(categoryRanks(thirdCategory, secondData));

      setThirdFirstCategoryRanks(categoryRanks(firstCategory, thirdData));
      setThirdSecondCategoryRanks(categoryRanks(secondCategory, thirdData));
      setThirdThirdCategoryRanks(categoryRanks(thirdCategory, thirdData));
    }
  }, [firstData, secondData, thirdData]);

  const categoryRanks = (category, data) => {
    const ranks = {};
    Object.keys(rank[category]).forEach((key) => {
      ranks[key] = data.paginatedData[0][key];
    });
    return ranks;
  };

  const category = {
    education: '🎒 교육',
    transportation: '🚌 교통',
    welfare: '💙 복지',
    safety: '🚨 안전',
    population: '👪 인구',
    convenience: '🏪 편의',
    environment: '🌳 환경'
  };
  const rank = {
    education: {
      libraryCountRank: '공공도서관 수',
      academyCountRank: '평생직업 사설학원 수'
    },
    transportation: {
      busStationRank: '버스 정류장 수'
    },
    welfare: {
      cultureCountRank: '문화시설 수',
      medicalCountRank: '병의원 및 약국'
    },
    safety: {
      crimeRateRank: '1000명당 범죄 발생 수'
    },
    population: {
      youthRateRank: '청년층 비율'
    },
    convenience: {
      supermarketRank: '대형마트 수'
    },
    environment: {
      parkRateRank: '1인당 공원 면적'
    }
  };

  console.log(
    firstCategory,
    secondCategory,
    thirdCategory,
    contractType,
    deposit,
    rent,
    recommendData
  );

  return (
    <>
      {/* <h4>ooo님에게 가장 적합한 동네는...</h4> */}
      <div
        style={{
          padding: '5%',
          width: '50%'
          // flex: '1',
          // display: 'flex',
          // flexDirection: 'column'
        }}
      >
        <SelectContainer>
          <TextOverlay>
            <p>
              1순위는 {category[firstCategory]}, 2순위는{' '}
              {category[secondCategory]}, 3순위는 {category[thirdCategory]}이고
              <br />
              {contractType == 'jeonse' ? (
                <>
                  전세가는 {deposit.min}만원 ~ {deposit.max}만원까지 알아보고
                  있는
                  <br />
                </>
              ) : (
                <>
                  월세 보증금은 {deposit.min}~{deposit.max}만원,
                  <br />
                  월세 보증금은 {rent.min}~{rent.max}만원까지 알아보고 있는
                </>
              )}
              <br />
              당신에게 추천드리는 동네는...
            </p>
          </TextOverlay>
        </SelectContainer>
        <Stack gap={3}>
          <div>
            {/* <div style={{ textAlign: 'center' }}> */}
            <h2 style={{ textAlign: 'center' }}>
              {/* <img src={`${process.env.PUBLIC_URL}/img/result.gif`} /> */}
              <Gif />
              &nbsp;
              <span style={{ fontWeight: 'bold' }}>
                {first[0].gu} {first[0].dong}
              </span>{' '}
              추천드립니다! &nbsp;
              <Gif />
            </h2>
            {/* </div> */}
            <h5>{category[firstCategory]}</h5>
            <p>
              {first[0].gu} {first[0].dong}은&nbsp;
              {Object.keys(firstFirstCategoryRanks).map((key, index, array) => (
                <span>
                  {rank[firstCategory][key]} {firstFirstCategoryRanks[key]}위
                  {index !== array.length - 1 && ', '}
                </span>
              ))}
              를 했어요.
            </p>
            <h5>{category[secondCategory]}</h5>
            <p>
              {first[0].gu} {first[0].dong}은&nbsp;
              {Object.keys(firstSecondCategoryRanks).map(
                (key, index, array) => (
                  <span>
                    {rank[secondCategory][key]} {firstSecondCategoryRanks[key]}
                    위{index !== array.length - 1 && ', '}
                  </span>
                )
              )}
              를 했어요.
            </p>
            <h5>{category[thirdCategory]}</h5>
            <p>
              {first[0].gu} {first[0].dong}은&nbsp;
              {Object.keys(firstThridCategoryRanks).map((key, index, array) => (
                <span>
                  {rank[thirdCategory][key]} {firstThridCategoryRanks[key]}위
                  {index !== array.length - 1 && ', '}
                </span>
              ))}
              를 했어요.
            </p>
          </div>
          <div>
            <h2>
              &#129352; {second[0].gu} {second[0].dong}
            </h2>
            <h5>{category[firstCategory]}</h5>
            <p>
              {second[0].gu} {second[0].dong}은&nbsp;
              {Object.keys(secondFirstCategoryRanks).map(
                (key, index, array) => (
                  <span>
                    {rank[firstCategory][key]} {secondFirstCategoryRanks[key]}위
                    {index !== array.length - 1 && ', '}
                  </span>
                )
              )}
              를 했어요.
            </p>
            <h5>{category[secondCategory]}</h5>
            <p>
              {second[0].gu} {second[0].dong}은&nbsp;
              {Object.keys(secondSecondCategoryRanks).map(
                (key, index, array) => (
                  <span>
                    {rank[secondCategory][key]} {secondSecondCategoryRanks[key]}
                    위{index !== array.length - 1 && ', '}
                  </span>
                )
              )}
              를 했어요.
            </p>
            <h5>{category[thirdCategory]}</h5>
            <p>
              {second[0].gu} {second[0].dong}은&nbsp;
              {Object.keys(secondThirdCategoryRanks).map(
                (key, index, array) => (
                  <span>
                    {rank[thirdCategory][key]} {secondThirdCategoryRanks[key]}위
                    {index !== array.length - 1 && ', '}
                  </span>
                )
              )}
              를 했어요.
            </p>
          </div>
          <div>
            <h2>
              &#129353; {third[0].gu} {third[0].dong}
            </h2>
            <h5>{category[firstCategory]}</h5>
            <p>
              {third[0].gu} {third[0].dong}은&nbsp;
              {Object.keys(thirdFirstCategoryRanks).map((key, index, array) => (
                <span>
                  {rank[firstCategory][key]} {thirdFirstCategoryRanks[key]}위
                  {index !== array.length - 1 && ', '}
                </span>
              ))}
              를 했어요.
            </p>
            <h5>{category[secondCategory]}</h5>
            <p>
              {third[0].gu} {third[0].dong}은&nbsp;
              {Object.keys(thirdSecondCategoryRanks).map(
                (key, index, array) => (
                  <span>
                    {rank[secondCategory][key]} {thirdSecondCategoryRanks[key]}
                    위{index !== array.length - 1 && ', '}
                  </span>
                )
              )}
              를 했어요.
            </p>
            <h5>{category[thirdCategory]}</h5>
            <p>
              {third[0].gu} {third[0].dong}은&nbsp;
              {Object.keys(thirdThirdCategoryRanks).map((key, index, array) => (
                <span>
                  {rank[thirdCategory][key]} {thirdThirdCategoryRanks[key]}위
                  {index !== array.length - 1 && ', '}
                </span>
              ))}
              를 했어요.
            </p>
          </div>
        </Stack>
      </div>
    </>
  );
}
