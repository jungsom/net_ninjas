import styled from 'styled-components';
import baseAxios from '../shared/api';
import { useState, useEffect } from 'react';
import { StringSplitAndSort } from './Util';
import GuInfoCarousels from './GuInfoCarousels';
import GuInfoCarouselsList from './GuinfoCarouselsList';
import {
  PencilFill,
  BusFrontFill,
  PeopleFill,
  TreeFill,
  CartFill,
  ShieldFill,
  DatabaseFill,
  Capsule
} from 'react-bootstrap-icons';

function GuInfoDescription({ guName }) {
  const [guData, setGudata] = useState([]);
  const [university, setUniversity] = useState('');
  const [touristArea, setTouristArea] = useState('');
  const [market, setMarket] = useState('');

  const getGuInformationData = async () => {
    const response = await baseAxios.get('/allPlace');
    const allGuData = response.data;

    const selectedGuData = allGuData.filter((item) => item.gu === guName)[0];
    const sortedUniversities = StringSplitAndSort(selectedGuData.university);
    const sortedTouristArea = StringSplitAndSort(selectedGuData.touristArea);
    const sortedMarket = StringSplitAndSort(selectedGuData.market);

    setUniversity(sortedUniversities);
    setTouristArea(sortedTouristArea);
    setMarket(sortedMarket);
    setGudata(selectedGuData);
  };

  useEffect(() => {
    getGuInformationData();
  }, [guName]);

  return (
    <StyledDiv>
      <GuTitle>
        <h4>서울시 {guName}</h4>
        <h3>{GuInfoCarouselsList[guName]?.subtitle}</h3>
      </GuTitle>
      <GuInfoCarousels guName={guName} />
      <p style={{ marginTop: '20px' }}>
        <ListTitle>1. 대학교</ListTitle>
        <ListDescription>{university || '없음'}</ListDescription>
      </p>
      <hr />
      <p>
        <ListTitle>2. 가볼만한 곳</ListTitle>
        <ListDescription>{touristArea}</ListDescription>
      </p>
      <hr />
      <p>
        <ListTitle>3. 주요 상권</ListTitle>
        <ListDescription>{market}</ListDescription>
      </p>
      <hr />
      <ListTitle>
        <DatabaseFill /> 동네잇유 DB 정보
      </ListTitle>
      <hr />
      <DBContainer>
        <DBGridContainer>
          <DBTitle>
            <PencilFill /> 교육 순위
          </DBTitle>
          <ListDescription>
            학원 수 : 전체 25개 자치구 중 {guData.academyCountRank}위
          </ListDescription>
          <ListDescription>
            도서관 수 : 전체 25개 자치구 중 {guData.libraryCoutRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <BusFrontFill /> 교통 순위
          </DBTitle>
          <ListDescription>
            버스정류장 수 : 전체 25개 자치구 중 {guData.busStationRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <Capsule /> 복지 순위
          </DBTitle>
          <ListDescription>
            문화시설 수 : 전체 25개 자치구 중 {guData.cultureCountRank}위
          </ListDescription>
          <ListDescription>
            의료시설 수 : 전체 25개 자치구 중 {guData.medicalCountRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <ShieldFill /> 안전 순위
          </DBTitle>
          <ListDescription>
            인구 1,000명당 범죄율 : 전체 25개 자치구 중 {guData.crimeRateRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <PeopleFill /> 인구 순위
          </DBTitle>
          <ListDescription>
            청년 비율 (19~34세) : 전체 25개 자치구 중 {guData.youthRateRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <CartFill /> 편의 순위
          </DBTitle>
          <ListDescription>
            편의시설 수 : 전체 25개 자치구 중 {guData.supermarketRank}위
          </ListDescription>
        </DBGridContainer>
        <DBGridContainer>
          <DBTitle>
            <TreeFill /> 환경 순위
          </DBTitle>
          <ListDescription>
            1인당 공원 면적 : 전체 25개 자치구 중 {guData.parkRateRank}위
          </ListDescription>
        </DBGridContainer>
      </DBContainer>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 900px;
  height: 1420px;
  li {
    list-style: none;
  }
  margin-top: 80px;
  margin-bottom: 25px;

  @media (max-width: 900px) {
    width: 100%;
    height: 1750px;
  }

  @media (min-width: 715px) {
    width: 100%;
    height: 1420px;
  }
`;

const GuTitle = styled.div`
  margin-left: 5px;
  h4 {
    color: #5fc3c8;
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
  }

  @media (max-width: 900px) {
    margin-left: 10px;
    h4 {
      font-size: 17px;
    }
    h3 {
      font-size: 19px;
    }
  }
`;

const ListTitle = styled.div`
  margin: 8px;
  font-weight: bold;
  font-size: 1.6em;

  @media (max-width: 900px) {
    font-size: 1.3em;
  }
`;

const DBContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, 350px);
  }
`;

const DBGridContainer = styled.div`
  height: 95px;
`;

const DBTitle = styled.div`
  margin: 10px;
  font-weight: bold;
  font-size: 1.2em;

  @media (max-width: 900px) {
    font-size: 1.1em;
  }
`;

const ListDescription = styled.span`
  display: block;
  margin-left: 15px;
  font-size: 1em;

  @media (max-width: 900px) {
    font-size: 0.9em;
  }
`;
export default GuInfoDescription;
