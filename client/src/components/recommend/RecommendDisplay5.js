import styled from 'styled-components';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import RecommendButton from './RecommendButton';
import { RECOMMEND_FUNNEL_STEP } from './RecommendProvider';

function RecommendDisplay5() {
  const { setFunnelStep, contractType, rent, setRent } =
    useContext(RecommendContext);
  return (
    <>
      <FirstText>
        <span className='qna'>Q.</span>
        <span>
          <span className='important'>월세가</span>의 예산은 어떻게 되시나요?
        </span>
      </FirstText>
      <SelectContainer>
        <SecondText>
          <span>A.</span>
          <span>월세가 예산 범위 설정(만원 단위)</span>
          <p></p>
        </SecondText>
        <OptionContainer>
          <FirstOption>
            <span>최소는</span>
            <input
              value={rent.min}
              type='number'
              onChange={(e) =>
                setRent({
                  ...rent,
                  min: e.target.value
                })
              }
            />
            <span>만원</span>
          </FirstOption>
          <SecondOption>
            <span>최대는</span>
            <input
              value={rent.max}
              type='number'
              onChange={(e) =>
                setRent({
                  ...rent,
                  max: e.target.value
                })
              }
            />
            <span>만원</span>
          </SecondOption>
        </OptionContainer>
      </SelectContainer>
      <ButtonContainer>
        <RecommendButton
          name='이전'
          onClick={() => {
            setFunnelStep(RECOMMEND_FUNNEL_STEP.RECOMMEND_FOURTH);
          }}
        />
        <RecommendButton
          name='다음'
          onClick={() => {
            if (Number(rent.min) > Number(rent.max)) {
              alert('예산 범위를 확인해주세요!');
              return;
            }
            if (contractType === 'month') {
              setFunnelStep(RECOMMEND_FUNNEL_STEP.RECOMMEND_LOADING);
            }
          }}
        />
      </ButtonContainer>
    </>
  );
}

const FirstText = styled.div`
  .qna {
    color: #5fc3c8;
    font-size: 50px;
    font-weight: bold;
  }
  span:nth-child(2) {
    font-size: 29px;
    .important {
      font-weight: bold;
    }
  }

  @media (max-width: 650px) {
    .qna {
      font-size: 30px;
    }
    span:nth-child(2) {
      font-size: 20px;
      .important {
        font-weight: bold;
      }
    }
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 350px;
  margin: 40px 0;
  background-color: transparent;
  background-image: url('./img/recommendInput/group18.png');
  background-repeat: no-repeat;
  background-size: 600px;

  @media (max-width: 650px) {
    background: none;
    border: 1.5px solid;
    height: 250px;
  }
`;

const SecondText = styled.div`
  padding: 5px 20px;
  p {
    margin-top: 5px;
    border-bottom: 1px solid;
  }

  span:nth-child(1) {
    font-size: 38px;
    font-weight: bold;
    color: #5fc3c8;
  }
  span:nth-child(2) {
    font-size: 25px;
  }

  @media (max-width: 650px) {
    span:nth-child(1) {
      font-size: 25px;
    }
    span:nth-child(2) {
      font-size: 18px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 60px;

  button:disabled {
    background-color: #a9a9a9;
  }

  @media (max-width: 650px) {
    padding: 0 20px;
    button {
      width: 60px;
      height: 35px;
      font-size: 18px;
      padding: 10px 20px;
    }
  }
`;

const OptionContainer = styled.div`
  span {
    font-size: 32px;
    line-height: 60px;
    font-weight: bold;
    margin: 0 15px;
  }
  input {
    text-align: right;
    margin-left: 15px;
    width: 150px;
    font-size: 25px;
    border-style: none;
    border-bottom: 3px solid #5fc3c8;
    outline: none;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  @media (max-width: 650px) {
    span {
      font-size: 20px;
      line-height: 35px;
    }
    input {
      margin-left: 10px;
      width: 120px;
      font-size: 18px;
    }
  }
`;

const FirstOption = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 650px) {
    margin-top: 5px;
  }
`;

const SecondOption = styled.div`
  display: flex;
  align-items: center;
`;
export default RecommendDisplay5;
