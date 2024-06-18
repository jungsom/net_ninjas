import GuInfoMap from './guinfo/GuInfoMap';
import styled from 'styled-components';

function GuInformation() {
  return (
    <StyledCenterLayout>
      <StyledContent>
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
  width: 1600px;
  h2 {
    margin-top: 30px;
    text-align: center;
  }
`;
export default GuInformation;
