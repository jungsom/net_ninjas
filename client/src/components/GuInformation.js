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
  min-width: 450px;
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  h2 {
    margin-top: 50px;
    margin-left: 20px;
    text-align: left;
    font-weight: bold;
  }

  @media (max-width: 830px) {
    h2 {
      font-size: 22px;
    }
  }
`;
export default GuInformation;
