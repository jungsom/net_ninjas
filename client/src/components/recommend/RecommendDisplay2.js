import styled from 'styled-components';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import RecommendButton from './RecommendButton';

const category = {
  교육: 'education',
  교통: 'transportation',
  복지: 'welfare',
  안전: 'safety',
  인구: 'population',
  편의: 'convenience',
  환경: 'environment'
};

function RecommendDisplay2() {
  const {
    setFirstOpen,
    setSecondOpen,
    setThirdOpen,
    firstCategory,
    setFirstCategory,
    secondCategory,
    setSecondCategory,
    thirdCategory,
    setThirdCategory
  } = useContext(RecommendContext);

  // 다른 순위에서 선택된 항목들은 선택 못하게 만드는 함수
  function createMenuItem(category, order) {
    const menuItemTag = [];
    const filter = [];
    order === 'first'
      ? filter.push(secondCategory, thirdCategory) // 매개변수가 "first"면 2순위, 3순위 값이 있는 항목은 제외하고 Menu를 생성
      : order === 'second'
      ? filter.push(firstCategory, thirdCategory)
      : filter.push(firstCategory, secondCategory);
    for (const key in category) {
      if (filter.includes(category[key])) continue; // filter 배열에 포함되면
      menuItemTag.push(
        <option key={category[key]} value={category[key]}>
          {key}
        </option>
      );
    }
    return menuItemTag;
  }

  return (
    <>
      <FirstText>
        <span className='qna'>Q.</span>
        <span>
          중요하게 생각하는 <span className='important'>우선순위</span>를
          알려주세요!
        </span>
      </FirstText>
      <SelectContainer>
        <SecondText>
          <span>A.</span>
          <span>우선순위 선택</span>
          <p></p>
        </SecondText>
        <OptionContainer>
          <FirstOption>
            <span>1순위는</span>
            <select
              labelId='first-select'
              value={firstCategory}
              onChange={(e) => {
                setFirstCategory(e.target.value);
              }}
            >
              <option key='1순위' selected disabled hidden value=''>
                1순위
              </option>
              {createMenuItem(category, 'first')}
            </select>
          </FirstOption>
          <SecondOption>
            <span>2순위는</span>
            <select
              id='second-select'
              value={secondCategory}
              onChange={(e) => {
                setSecondCategory(e.target.value);
              }}
            >
              <option key='2순위' selected disabled hidden value=''>
                2순위
              </option>
              {createMenuItem(category, 'second')}
            </select>
          </SecondOption>
          <ThirdOption>
            <span>3순위는</span>
            <select
              id='third-select'
              value={thirdCategory}
              onChange={(e) => {
                setThirdCategory(e.target.value);
              }}
            >
              <option key='3순위' selected disabled hidden value=''>
                3순위
              </option>
              {createMenuItem(category, 'third')}
            </select>
          </ThirdOption>
        </OptionContainer>
      </SelectContainer>
      <ButtonContainer>
        <RecommendButton
          name='이전'
          onClick={() => {
            setFirstOpen(true);
            setSecondOpen(false);
          }}
          style={{ display: 'none' }}
        />
        <RecommendButton
          name='다음'
          onClick={() => {
            setSecondOpen(false);
            setThirdOpen(true);
          }}
          disabled={!firstCategory || !secondCategory || !thirdCategory}
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
    background-size: 100%;
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

const OptionContainer = styled.div`
  span {
    font-size: 32px;
    line-height: 60px;
    font-weight: bold;
    margin: 0 15px;
  }
  select {
    margin-left: 15px;
    width: 150px;
    font-size: 25px;
    border-style: none;
    border-bottom: 3px solid #5fc3c8;
    appearance: none;
    background: url('../img/recommendInput/polygon1.png') no-repeat right 10px
      center;
    background-size: 15px;
  }

  @media (max-width: 650px) {
    span {
      font-size: 20px;
      line-height: 35px;
    }
    select {
      margin-left: 10px;
      width: 120px;
      font-size: 18px;
      background-size: 12px;
    }
  }
`;

const FirstOption = styled.div`
  display: flex;
  align-items: center;
`;

const SecondOption = styled.div`
  display: flex;
  align-items: center;
`;

const ThirdOption = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 60px;

  button:disabled {
    background-color: #a9a9a9;
  }

  @media (max-width: 650px) {
    button {
      font-size: 18px;
      padding: 10px 20px;
      width: 120px;
      height: 60px;
    }
  }
`;

export default RecommendDisplay2;
