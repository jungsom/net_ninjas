import styled from 'styled-components';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import RecommendButton from './RecommendButton';

function RecommendDisplay3() {
  const {
    setSecondOpen,
    setThirdOpen,
    setFourthOpen,
    contractType,
    setContractType
  } = useContext(RecommendContext);
  return (
    <>
      <FirstText>
        <span className='qna'>Q.</span>
        <span>
          생각하고 있는 <span className='important'>예산의 종류</span>는요?
        </span>
      </FirstText>
      <SelectContainer>
        <SecondText>
          <span>A.</span>
          <span>예산 종류 선택</span>
          <p></p>
        </SecondText>
        <ContractTypeButtonContainer>
          <JeonseButton>
            <RecommendButton
              name='전세'
              className={
                contractType === 'jeonse' ? 'activatedBtn' : 'nonActivatedBtn'
              }
              onClick={() => setContractType('jeonse')}
            />
          </JeonseButton>
          <MonthButton>
            <RecommendButton
              name='월세'
              className={
                contractType === 'month' ? 'activatedBtn' : 'nonActivatedBtn'
              }
              onClick={() => setContractType('month')}
            />
          </MonthButton>
        </ContractTypeButtonContainer>
      </SelectContainer>
      <ButtonContainer>
        <RecommendButton
          name='이전'
          onClick={() => {
            setSecondOpen(true);
            setThirdOpen(false);
          }}
        />
        <RecommendButton
          name='다음'
          onClick={() => {
            setThirdOpen(false);
            setFourthOpen(true);
          }}
          disabled={!contractType}
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

const ContractTypeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 550px;
    margin: 15px;
    background-color: #8dd2d6;
  }
  .activatedBtn {
    background-color: #5fc3c8;
  }
`;

const JeonseButton = styled.div``;

const MonthButton = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 60px;

  button:disabled {
    background-color: #a9a9a9;
  }
`;

export default RecommendDisplay3;
