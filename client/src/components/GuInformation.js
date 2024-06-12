import SideArrowButton from './SideArrowButton';
import GuInfoMap from './guinfo/GuInfoMap';
import styled from 'styled-components';

function GuInformation() {
  return (
    <StyledCenterLayout>
      <SideArrowButton arrow='left' title='홈' to='/home' />
      <StyledContent>
        <h2>자치구 소개</h2>
        <GuInfoMap />
      </StyledContent>
      <SideArrowButton arrow='right' title='추천' to='/recommend' />
    </StyledCenterLayout>
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
export default GuInformation;
