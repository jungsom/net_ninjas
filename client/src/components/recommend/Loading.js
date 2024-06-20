import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import RecommendContext from './RecommendContext';

function Loading() {
  const { getRecommendData } = useContext(RecommendContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      getRecommendData();
    }, 1500);

    return () => clearTimeout(timer); // 정리 함수
  }, [getRecommendData]);

  return (
    <>
      <LoadingImg>
        <img src='./img/recommendInput/image28.png' alt='loading' />
      </LoadingImg>
      <LoadingMessage>
        전달받은 정보를 바탕으로 알맞은 동네를 찾고 있어요!
      </LoadingMessage>
    </>
  );
}

const LoadingImg = styled.div`
  margin-top: 200px;
  text-align: center;
  img {
    width: 120px;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 650px) {
    margin-top: 100px;
    img {
      width: 90px;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 20px;
  animation: colorChange 3s linear infinite;

  @keyframes colorChange {
    0% {
      color: #5fc3c8;
    }
    33% {
      color: #8cd4d7;
    }
    66% {
      color: #75cbcf;
    }
    100% {
      color: #5fc3c8;
    }
  }

  @media (max-width: 650px) {
    font-size: 16px;
  }
`;

export default Loading;
