import { useState, useContext, useEffect } from 'react';
import TotalStatisticsContext from './TotalStatisticsContext';
import styled from 'styled-components';
import InputBox from '../InputBox';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';

function TotalStatisticsSearch() {
  const {
    keyword,
    setKeyword,
    setPage,
    setSort,
    setSortColumn,
    setJeonseDeposit,
    setMonthDeposit,
    setRent
  } = useContext(TotalStatisticsContext); // TotalContext의 setData를 구조분해할당으로 가져옴

  const [inputKeyword, setInputKeyword] = useState('');

  const inputEnterSearch = (e) => {
    e.preventDefault();
    setKeyword(inputKeyword);
    setPage(1);
    setSort('');
    setSortColumn('');
    setJeonseDeposit(0);
    setMonthDeposit(0);
    setRent(0);
  };

  useEffect(() => {
    setInputKeyword(keyword);
  }, []);

  // keyword를 받아서 API 요청, 받은 결과값을 data로 설정해줌
  // 초기화 버튼을 누르면 data를 다시 빈 배열로 초기화
  return (
    <StyledSearch>
      <form onSubmit={inputEnterSearch}>
        <InputBox
          name='totalStatisticsSearchInputBox'
          value={inputKeyword}
          placeholder='예) 강남구, 강남구 역삼동, 역삼동'
          onChange={(e) => setInputKeyword(e.target.value)}
        />
      </form>
      <Button variant='primary' title='찾기' onClick={inputEnterSearch}>
        찾기 <Search />
      </Button>
      <Button
        variant='primary'
        title='초기화'
        onClick={() => {
          setPage(1);
          setSort('');
          setSortColumn('');
          setKeyword('');
          setInputKeyword('');
          setJeonseDeposit(0);
          setMonthDeposit(0);
          setRent(0);
        }}
      >
        초기화 <ArrowClockwise />
      </Button>
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 8px 0 8px 8px;
  margin-top: 10px;
  input {
    margin-right: 3px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    svg {
      margin-left: 5px;
    }
  }

  button:nth-child(3) {
    margin-left: 3px;
  }

  @media (max-width: 990px) {
    justify-content: center;
    input {
      width: 100%;
    }
    button {
      width: 60px;
      font-size: 12px;
    }
  }
`;

export default TotalStatisticsSearch;
