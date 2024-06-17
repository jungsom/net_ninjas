import BoardMainPage from './board/BoardMainPage';
import BoardSearchBar from './board/BoardSearchBar';
import styled from 'styled-components';

function Board() {
  return (
    <StyledCenterLayout>
      <StyledContent>
        <BoardSearchBar />
        <BoardMainPage />
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

export default Board;
