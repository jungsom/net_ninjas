import styled from 'styled-components';
import MyInformation from './myPage/MyInformation';
import Button from 'react-bootstrap/Button';


function MyPage() {
  return (
    <StyledCenterLayout>
      <StyledContent>
        <h2>마이 페이지</h2>
        <MyInformation/>
        <hr/>
        <div className='menu'>
        <Button variant='primary'>비밀번호 변경</Button>
        <Button variant='primary'>내가 작성한 글</Button>
        <Button variant='primary'>회원탈퇴</Button>
        </div>
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

  .menu{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default MyPage;
