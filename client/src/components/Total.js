import TotalTable from './total/TotalTable';
import TotalSearch from './total/TotalSearch';
import TotalProvider from './total/TotalProvider';
import styled from 'styled-components';

function Total() {
  return (
    <TotalProvider>
      <StyledCenterLayout>
        <StyledContent>
          <TotalSearch />
          <TotalTable />
        </StyledContent>
      </StyledCenterLayout>
    </TotalProvider>
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
export default Total;
