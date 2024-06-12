import { useState, useContext } from 'react';
import TotalContext from './TotalContext';
import styled from 'styled-components';
import InputBox from '../InputBox';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';

function TotalSearch() {
  const { setDongData, setPage, setSort, setSortColumn } =
    useContext(TotalContext); // TotalContext의 setData를 구조분해할당으로 가져옴
  const [keyword, setKeyword] = useState('');

  // keyword를 받아서 서버 API 호출, 지금은 아직 미구현
  function getSearchedData(keyword) {
    const fetchedData = [
      {
        regeion: { gu: '강남구', dong: '역삼동' },
        education: { academyCount: '24.24842', libraryCount: '5.48843' },
        environment: { parkRate: '24.583343' },
        safety: { crimeRate: '6.378483' },
        welfare: { cultureCount: '58.39523', medicalCount: '52.352523' },
        housing: {
          jeonseDeposit: '20032.523983',
          monthDeposit: '10020.526112',
          monthRent: '129.525252'
        },
        population: { youthRate: '16.48483' },
        transportation: { busStation: '23.28282' },
        convenience: { supermarket: '2' }
      },
      {
        regeion: { gu: '중구', dong: '장충동2가' },
        education: { academyCount: '12.24842', libraryCount: '3.48843' },
        environment: { parkRate: '36.583343' },
        safety: { crimeRate: '10.378483' },
        welfare: { cultureCount: '76.39523', medicalCount: '21.352523' },
        housing: {
          jeonseDeposit: '10040.523983',
          monthDeposit: '8092.526112',
          monthRent: '75.525252'
        },
        population: { youthRate: '10.48483' },
        transportation: { busStation: '19.28282' },
        convenience: { supermarket: '1' }
      }
    ];
    return fetchedData;
  }

  // keyword를 받아서 API 요청, 받은 결과값을 data로 설정해줌
  // 초기화 버튼을 누르면 data를 다시 빈 배열로 초기화
  return (
    <StyledSearch>
      <InputBox
        name='totalSearchInputBox'
        value={keyword}
        placeholder='예) 강남구, 강남구 역삼동, 역삼동'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button
        variant='primary'
        title='찾기'
        onClick={() => {
          const searchedData = getSearchedData(keyword);
          setDongData(searchedData);
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
          setDongData([]);
          setPage(1);
          setSort('');
          setSortColumn('');
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

  padding: 8px;
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
