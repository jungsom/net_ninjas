import styled from 'styled-components';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import { RECOMMEND_FUNNEL_STEP } from './RecommendProvider';

function RecommendFirstDisplay() {
  const { setFunnelStep } = useContext(RecommendContext);

  return (
    <>
      <FirstText>
        <span>나, 이제 막 상경했어요!</span>
        <img src='./img/recommendInput/image27.png' alt='sad' />
      </FirstText>
      <SecondText>
        <span>학교와 직장을 위해 상경한 당신.</span>
        <span>어떤 동네가 나에게 가장 잘 맞는 동네인지 잘 모르겠다구요?</span>
      </SecondText>
      <LogoImage>
        <img src='./img/recommendInput/home_logo_title.png' alt='logo' />
      </LogoImage>
      <ThirdText>
        <span>동잇팀이 당신과 동네를 이어드립니다!</span>
        <span>
          방대한 DB와 추천 알고리즘을 바탕으로 가장 알맞는 동네를 알려드려요.
        </span>
      </ThirdText>
      <NextButton>
        <button
          onClick={() => {
            setFunnelStep(RECOMMEND_FUNNEL_STEP.RECOMMEND_SECOND);
          }}
        >
          지금 동네 추천 받으러 가기!{' '}
          <img src='./img/recommendInput/vector.png' />
        </button>
      </NextButton>
    </>
  );
}

const FirstText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    font-size: 30px;
    font-weight: 900;
    word-break: keep-all;
  }
  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 650px) {
    span {
      font-size: 20px;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const SecondText = styled.div`
  margin-top: 10px;
  span {
    display: block;
    font-size: 19px;
    word-break: keep-all;
  }

  @media (max-width: 650px) {
    span {
      font-size: 15px;
    }
  }
`;

const LogoImage = styled.div`
  width: 100%;
  height: 190px;
  margin: 50px 0;
  background-color: #bcf6f9;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 90px;
  }
`;

const ThirdText = styled.div`
  span {
    display: block;
    font-size: 19px;
  }

  @media (max-width: 650px) {
    span {
      font-size: 15px;
      word-break: keep-all;
    }
  }
`;

const NextButton = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 70px;
  button {
    font-weight: bold;
    border: none;
    background: none;
  }

  @media (max-width: 650px) {
    font-size: 20px;
    img {
      height: 28px;
    }
  }
`;

export default RecommendFirstDisplay;
