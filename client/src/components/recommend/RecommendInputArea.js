import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import styled from 'styled-components';
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
