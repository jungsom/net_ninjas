import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'react-bootstrap-icons';

function RecommendNotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <img src='../img/recommendInput/recommendNotFound.png' />
      <p>동네를 찾을 수가 없어요.</p>
      <span>입력하신 조건에 부합하는 동네를 찾지 못했어요.</span>
      <span>다른 조건을 입력해 주시면 다시 찾아드릴게요.</span>
      <ButtonContainer>
        <button onClick={() => navigate('/recommend')}>
          다시 하기
          <ChevronRight size={42} color='#5FC3C8' />
        </button>
        <button onClick={() => navigate('/')}>
          홈으로 이동
          <ChevronRight size={42} color='#5FC3C8' />
        </button>
      </ButtonContainer>
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

  @media (max-width: 650px) {
    img {
      width: 80px;
      height: 80px;
    }
    p {
      font-size: 20px;
    }
    span {
      font-size: 13px;
    }
    button {
      margin-top: 80px;
      font-size: 18px;
    }
    button svg {
      width: 30px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export default RecommendNotFound;
