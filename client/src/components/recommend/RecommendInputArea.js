import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';
import RecommendDisplay1 from './RecommendDisplay1';
import RecommendDisplay2 from './RecommendDisplay2';
import RecommendDisplay3 from './RecommendDisplay3';
import RecommendDisplay4 from './RecommendDisplay4';
import RecommendDisplay5 from './RecommendDisplay5';
import Loading from './Loading';

const category = {
  교육: 'Education',
  교통: 'Transportation',
  복지: 'Welfare',
  안전: 'Safety',
  인구: 'Population',
  편의: 'Convenience',
  환경: 'Environment'
};

function RecommendInputArea() {
  const {
    firstOpen,
    secondOpen,
    thirdOpen,
    fourthOpen,
    fifthOpen,
    isLoading,
    contractType
  } = useContext(RecommendContext);

  // function inputValidation() {
  //   if (!firstCategory || !secondCategory || !thirdCategory || !contractType) {
  //     alert('선택하지 않은 값이 있습니다.');
  //     return false;
  //   }

  //   if (contractType === 'jeonse' && minDeposit >= maxDeposit) {
  //     alert('예산 범위를 다시 확인해주세요.');
  //     return false;
  //   }

  //   if (
  //     contractType === 'month' &&
  //     (minDeposit >= maxDeposit || minRent >= maxRent)
  //   ) {
  //     alert('예산 범위를 다시 확인해주세요.');
  //     return false;
  //   }
  // }

  return (
    <DisplayContainer>
      {firstOpen && <RecommendDisplay1 />}
      {!firstOpen && secondOpen && <RecommendDisplay2 />}
      {!secondOpen && thirdOpen && <RecommendDisplay3 />}
      {!thirdOpen && fourthOpen && <RecommendDisplay4 />}
      {!fourthOpen && fifthOpen && <RecommendDisplay5 />}
      {contractType === 'jeonse' && !fourthOpen && isLoading && <Loading />}
      {contractType === 'month' && !fifthOpen && isLoading && <Loading />}
    </DisplayContainer>
  );
}

const DisplayContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 100px;

  @media (max-width: 650px) {
    width: 100%;
    padding: 0 20px;
    margin-top: 50px;
  }
`;
export default RecommendInputArea;
