import TotalTable from './total/TotalTable';
import TotalSearch from './total/TotalSearch';
import TotalProvider from './total/TotalProvider';
import styled from 'styled-components';

function Total() {
  return (
    <StyledCenterLayout>
      <TotalProvider>
        <TotalSearch />
        <TotalTable />
      </TotalProvider>
    </StyledCenterLayout>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export default Total;
