import TotalTable from './total/TotalTable';
import TotalSearch from './total/TotalSearch';
import styled from 'styled-components';

function Total() {
  return (
    <StyledContent>
      <TotalSearch />
      <TotalTable />
    </StyledContent>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Total;
