import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'react-bootstrap-icons';

function TotalMobile() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* <img src='../img/recommendInput/recommendNotFound.png' /> */}
      <p>PC로 접속해주세요.</p>
      <span>해당 페이지는 PC 화면에 최적화되어 있습니다.</span>
      <span>
        최대한 빠른 시일 내에 모바일에서도 접속하실 수 있도록 최선을
        다하겠습니다.
      </span>
      <ButtonContainer>
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
    margin: 160px 0 40px 0;
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

  @media (max-width: 850px) {
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

export default TotalMobile;
