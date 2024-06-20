import RecommendInputArea from './recommend/RecommendInputArea';
import RecommendProvider from './recommend/RecommendProvider';
import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
`;

export default Recommend;
