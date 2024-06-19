import TotalTable from './total/TotalTable';
import TotalSearch from './total/TotalSearch';
import TotalProvider from './total/TotalProvider';
import styled from 'styled-components';
import SideArrowButton from './SideArrowButton';

function Total() {
  return (
    <TotalProvider>
      <StyledCenterLayout>
        <SideArrowButton arrow='left' title='추천' to='/recommend' />
        <StyledContent>
          <h2>전체 통계</h2>
          <TotalSearch />
          <TotalTable />
        </StyledContent>
        <SideArrowButton arrow='right' title='통계 분석' to='/analysis' />
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
