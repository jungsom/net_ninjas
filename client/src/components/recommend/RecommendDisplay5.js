import styled from 'styled-components';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import RecommendButton from './RecommendButton';

function RecommendDisplay5() {
  const {
    setFourthOpen,
    setFifthOpen,
    setIsLoading,
    contractType,
    minRent,
    setMinRent,
    maxRent,
    setMaxRent
  } = useContext(RecommendContext);
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
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
            <span>만원</span>
          </FirstOption>
          <SecondOption>
            <span>최대는</span>
            <input
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
            <span>만원</span>
          </SecondOption>
        </OptionContainer>
      </SelectContainer>
      <ButtonContainer>
        <RecommendButton
          name='이전'
          onClick={() => {
            setFourthOpen(true);
            setFifthOpen(false);
          }}
        />
        <RecommendButton
          name='다음'
          onClick={() => {
            if (minRent >= maxRent) {
              alert('예산 범위를 확인해주세요!');
              return;
            }
            if (contractType === 'month') {
              setFifthOpen(false);
              setIsLoading(true);
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
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 350px;
  margin: 40px 0;
  background-color: transparent;
  background-image: url('./img/recommendInput/group18.png');
  background-repeat: no-repeat;
  background-size: 600px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 60px;

  button:disabled {
    background-color: #a9a9a9;
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
`;

const FirstOption = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const SecondOption = styled.div`
  display: flex;
  align-items: center;
`;

export default RecommendDisplay5;
