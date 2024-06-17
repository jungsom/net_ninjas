import BoardMainPage from './board/BoardMainPage';
import BoardProvider from './board/BoardProvider';
import BoardSearchBar from './board/BoardSearchBar';
import styled from 'styled-components';

function Board() {
  return (
    <BoardProvider>
      <StyledCenterLayout>
        <StyledContent>
          <BoardSearchBar />
          <BoardMainPage />
        </StyledContent>
      </StyledCenterLayout>
    </BoardProvider>
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

export default Board;
