import RecommendInputArea from './recommend/RecommendInputArea';
import RecommendProvider from './recommend/RecommendProvider';
import styled from 'styled-components';
import SideArrowButton from './SideArrowButton';

function Recommend() {
  return (
    <RecommendProvider>
      <StyledCenterLayout>
        <StyledContent>
          <RecommendInputArea />
        </StyledContent>
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
