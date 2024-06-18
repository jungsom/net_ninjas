import GuInfoMap from './guinfo/GuInfoMap';
import styled from 'styled-components';

function GuInformation() {
  return (
    <StyledCenterLayout>
      <StyledContent>
        <h2>알고 싶은 자치구를 선택하세요!</h2>
        <GuInfoMap />
      </StyledContent>
    </StyledCenterLayout>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 950px;
  h2 {
    margin-top: 50px;
    text-align: left;
    font-weight: bold;
  }
`;
export default GuInformation;
