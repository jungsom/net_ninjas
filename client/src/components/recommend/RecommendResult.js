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
import TotalContext from '../total/TotalContext';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  padding: 5%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2, h3, h5 {
    text-align: center;
`;

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

const ButtonWrapper = styled.div`
  //   width: 100%;
  //   margin-left: 60px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  all: unset;
  font-weight: bold;
  font-size: 1.2em;
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

  const { setKeyword, setPage, setSort, setSortColumn } =
    useContext(TotalContext); // 이 부분 다른 항목에도 붙여넣기
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
        if (first.length > 0) {
          const firstResponse = await baseAxios.get(
            `/allResearch/search?keyword=${first[0].dong}`
          );
          setFirstData(firstResponse.data);
        }
        if (second.length > 0) {
          const secondResponse = await baseAxios.get(
            `/allResearch/search?keyword=${second[0].dong}`
          );
          setSecondData(secondResponse.data);
        }
        if (third.length > 0) {
          const thirdResponse = await baseAxios.get(
            `/allResearch/search?keyword=${third[0].dong}`
          );
          setThirdData(thirdResponse.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (firstData) {
      setFirstFirstCategoryRanks(categoryRanks(firstCategory, firstData));
      setFirstSecondCategoryRanks(categoryRanks(secondCategory, firstData));
      setFirstThirdCategoryRanks(categoryRanks(thirdCategory, firstData));
    }
    if (secondData) {
      setSecondFirstCategoryRanks(categoryRanks(firstCategory, secondData));
      setSecondSecondCategoryRanks(categoryRanks(secondCategory, secondData));
      setSecondThirdCategoryRanks(categoryRanks(thirdCategory, secondData));
    }
    if (thirdData) {
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
    convenience: '🛒 편의',
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
      medicalCountRank: '병의원 및 약국 수'
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

  console.log(firstData);
  console.log(firstFirstCategoryRanks);

  function Content({
    data,
    firstCategoryRanks,
    secondCategoryRanks,
    thridCategoryRanks
  }) {
    return (
      <div style={{ padding: '3% 1%' }}>
        <div style={{ textAlign: 'center' }}>
          <h5>{category[firstCategory]}</h5>
          <p>
            {data[0].gu} {data[0].dong}은&nbsp;
            {Object.keys(firstCategoryRanks).map((key, index, array) => (
              <span>
                {rank[firstCategory][key]} {firstCategoryRanks[key]}위
                {index !== array.length - 1 && ', '}
              </span>
            ))}
            를 했어요.
          </p>
          <h5>{category[secondCategory]}</h5>
          <p>
            {data[0].gu} {data[0].dong}은&nbsp;
            {Object.keys(secondCategoryRanks).map((key, index, array) => (
              <span>
                {rank[secondCategory][key]} {secondCategoryRanks[key]}위
                {index !== array.length - 1 && ', '}
              </span>
            ))}
            를 했어요.
          </p>
          <h5>{category[thirdCategory]}</h5>
          <p>
            {data[0].gu} {data[0].dong}은&nbsp;
            {Object.keys(thridCategoryRanks).map((key, index, array) => (
              <span>
                {rank[thirdCategory][key]} {thridCategoryRanks[key]}위
                {index !== array.length - 1 && ', '}
              </span>
            ))}
            를 했어요.
          </p>
        </div>
        <ButtonWrapper onClick={() => MoveToTable(data[0].dong)}>
          <StyledButton>
            {data[0].gu} {data[0].dong} 더 알아보러 가기
          </StyledButton>
          <img
            src={`${process.env.PUBLIC_URL}/img/arrow.png`}
            style={{
              marginLeft: '20px',
              marginBottom: '0px',
              height: '30px'
            }}
          />
        </ButtonWrapper>
      </div>
    );
  }

  return (
    <>
      <Wrapper
        style={{
          padding: '5%',
          width: '70%'
          // flex: '1',
          // display: 'flex',
          // flexDirection: 'column'
        }}
      >
        <div style={{ alignItems: 'center' }}>
          <SelectContainer>
            <TextOverlay>
              <p>
                1순위는 {category[firstCategory]}, 2순위는{' '}
                {category[secondCategory]}, 3순위는 {category[thirdCategory]}
                이고
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
        </div>
        <Stack gap={5}>
          <div>
            {/* <div style={{ textAlign: 'center' }}> */}
            <h2>
              {/* <img src={`${process.env.PUBLIC_URL}/img/result.gif`} /> */}
              <Gif />
              &nbsp;
              <span style={{ fontWeight: 'bold' }}>
                {first[0].gu} {first[0].dong}
              </span>{' '}
              추천드립니다! &nbsp;
              <Gif />
            </h2>
            <Content
              data={first}
              firstCategoryRanks={firstFirstCategoryRanks}
              secondCategoryRanks={firstSecondCategoryRanks}
              thridCategoryRanks={firstThridCategoryRanks}
            />
          </div>
          {second.length > 0 && (
            <>
              <h3 style={{ padding: '10%', color: '#5fc3c8' }}>
                혹시... 다른 동네는 어떠세요?
              </h3>
              <div>
                <h2>
                  &#129352; {second[0].gu} {second[0].dong}
                </h2>
                <Content
                  data={second}
                  firstCategoryRanks={secondFirstCategoryRanks}
                  secondCategoryRanks={secondSecondCategoryRanks}
                  thridCategoryRanks={secondThirdCategoryRanks}
                />
              </div>
            </>
          )}
          {third.length > 0 && (
            <div>
              <h2>
                &#129353; {third[0].gu} {third[0].dong}
              </h2>
              <Content
                data={third}
                firstCategoryRanks={thirdFirstCategoryRanks}
                secondCategoryRanks={thirdSecondCategoryRanks}
                thridCategoryRanks={thirdThirdCategoryRanks}
              />
            </div>
          )}
        </Stack>
      </Wrapper>
    </>
  );
}
