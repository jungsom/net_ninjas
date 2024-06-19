import RecommendInputArea from './recommend/RecommendInputArea';
import RecommendProvider from './recommend/RecommendProvider';
import RecommendResult from './recommend/RecommendResult';
import styled from 'styled-components';
import SideArrowButton from './SideArrowButton';

function Recommend() {
  return (
    <RecommendProvider>
      <StyledCenterLayout>
        <SideArrowButton arrow='left' title='자치구 소개' to='/gu_info' />
        <StyledContent>
          <h2>주거 추천 서비스</h2>
          <RecommendInputArea />
        </StyledContent>
        <SideArrowButton arrow='right' title='통계 분석' to='/analysis' />
      </StyledCenterLayout>
    </RecommendProvider>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 1600px;
  h2 {
    margin-top: 30px;
    text-align: center;
  }
  display: flex;
  flex-direction: column;
`;

export default Recommend;
