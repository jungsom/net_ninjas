import { useState, useContext } from 'react';
import TotalContext from './TotalContext';
import styled from 'styled-components';
import InputBox from '../InputBox';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';

function TotalSearch() {
  const { setKeyword, setPage, setSort, setSortColumn } =
    useContext(TotalContext); // TotalContext의 setData를 구조분해할당으로 가져옴

  const [inputKeyword, setInputKeyword] = useState('');

  const inputEnterSearch = (e) => {
    e.preventDefault();
    setKeyword(inputKeyword);
    setPage(1);
    setSort('');
    setSortColumn('');
  };

  // keyword를 받아서 API 요청, 받은 결과값을 data로 설정해줌
  // 초기화 버튼을 누르면 data를 다시 빈 배열로 초기화
  return (
    <StyledSearch>
      <form onSubmit={inputEnterSearch}>
        <InputBox
          name='totalSearchInputBox'
          value={inputKeyword}
          placeholder='예) 강남구, 강남구 역삼동, 역삼동'
          onChange={(e) => setInputKeyword(e.target.value)}
        />
      </form>
      <Button
        variant='primary'
        title='찾기'
        onClick={() => {
          setKeyword(inputKeyword);
          setPage(1);
          setSort('');
          setSortColumn('');
        }}
      >
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
`;

export default TotalSearch;
