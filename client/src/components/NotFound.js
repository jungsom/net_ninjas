import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'react-bootstrap-icons';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <img src='./img/recommendInput/404.png' />
      <p>페이지를 찾을 수 없습니다.</p>
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
      <span>주소를 다시 확인하거나 다른 페이지로 이동해 주세요.</span>
      <button onClick={() => navigate('/')}>
        홈으로 이동
        <ChevronRight size={42} color='#5FC3C8' />
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    margin-top: 180px;
    width: 140px;
    height: 140px;
  }
  p {
    margin: 40px 0;
    font-size: 36px;
    font-weight: bold;
  }

  span {
    display: block;
    font-size: 24px;
  }

  button {
    margin-top: 120px;
    border: none;
    background: none;
    font-size: 24px;
    font-weight: bold;
  }
`;

export default NotFound;
