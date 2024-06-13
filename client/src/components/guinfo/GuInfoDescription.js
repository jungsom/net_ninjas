import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

function GuInfoDescription({ guName }) {
  const [guData, setGuData] = useState([]);
  const [university, setUniversity] = useState('');

  const getGuInformationData = async () => {
    const response = await axios.get(
      'http://kdt-ai-10-team05.elicecoding.com:3000/allPlace'
    );
    const data = response.data;
    const filteredData = data.filter((item) => item.gu === guName);
    setGuData(filteredData[0]);
    console.log(guData);
    const universities = guData.university
      ?.split(',')
      .map((items) => items.trim()); // 대학교 문자열을 ',' 기준으로 자른 후, 정렬을 위해 공백을 제거해줌
    const sortedUniversities = universities
      ?.sort((a, b) => (a > b ? 1 : -1))
      .join()
      .replaceAll(',', ', '); // 대학교 문자열을 정렬
    setUniversity(sortedUniversities);
    console.log(university);
  };

  useEffect(() => {
    getGuInformationData();
  }, [guName, guData, university]);

  return (
    <StyledDiv>
      <h3>서울시 {guData.gu}</h3>

      <p>
        <span>1. 소재 대학교: </span>
        <span>{university || '없음'}</span>
      </p>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 900px;
`;

export default GuInfoDescription;
