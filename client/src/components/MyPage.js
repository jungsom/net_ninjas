import styled from 'styled-components';
import MyInformation from './myPage/MyInformation';
import MyPost from './myPage/MyPost';


function MyPage() {
  return (
    <StyledCenterLayout>
      <StyledContent>
        <h2>마이 페이지</h2>
        <MyInformation/>
        <hr/>
        <h3>내 게시글</h3>
        <MyPost/>

      </StyledContent>
    </StyledCenterLayout>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  h2 {
    margin-top: 30px;
    text-align: center;
  }

   display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default MyPage;
