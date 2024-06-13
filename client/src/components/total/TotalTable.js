import styled from 'styled-components';
import { useContext } from 'react';
import TotalContext from './TotalContext';
import TotalPagenation from './TotalPagenation';
import { whitespace, numberToKoreanCurreny } from './Util.js';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

// MUI Datagrid가 TypeScript만 지원해서 테이블을 이용해서 구현함
function TotalTable() {
  const { dongData, sort, setSort, sortColumn, setSortColumn, setPage } =
    useContext(TotalContext); // useContext를 이용해 Provider에서 data를 받아옴

  // 자료의 수가 20보다 적을 때 빈 행을 만들어줌
  whitespace(dongData);

  const handleThClick = (name) => {
    sortDongColumnData(name);
    setSortColumn(name);
  };

  const getSortIcon = (name) => {
    if (name === sortColumn) {
      return sort === 'asc' ? (
        <ArrowUp />
      ) : sort === 'desc' ? (
        <ArrowDown />
      ) : (
        ''
      );
    }
  };

  // column을 누르면 누른 곳의 className이름을 가져와서 기존의 sortColumn 값과 비교해서 정렬 방식을 결정하는 함수
  function sortDongColumnData(name) {
    if (name !== sortColumn) {
      // 다른 열을 눌렀을 경우 내림차순으로 바꿔줌
      name === 'gu' || name === 'dong' ? setSort('asc') : setSort('desc');
      setPage(1);
      return; // 얼리 리턴
    }
    if (sort === '') {
      name === 'gu' || name === 'dong' ? setSort('asc') : setSort('desc');
      setPage(1);
      return;
    }
    if (sort === 'asc') {
      name === 'gu' || name === 'dong' ? setSort('desc') : setSort('');
      setPage(1);
      return;
    }

    name === 'gu' || name === 'dong' ? setSort('') : setSort('asc'); // sort가 desc일 때 다시 기본 정렬로
    setPage(1);
  }

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th colSpan={2}>지역</th>
            <th colSpan={2}>교육</th>
            <th>교통</th>
            <th colSpan={2}>복지</th>
            <th>안전</th>
            <th>인구</th>
            <th colSpan={3}>주거</th>
            <th>편의</th>
            <th>환경</th>
          </tr>
          <StyledLowerCategory>
            <th
              className='gu'
              onClick={(e) => handleThClick(e.target.className)}
            >
              자치구{getSortIcon('gu')}
            </th>
            <th
              className='dong'
              onClick={(e) => handleThClick(e.target.className)}
            >
              법정동{getSortIcon('dong')}
            </th>
            <th
              className='academyCount'
              onClick={(e) => handleThClick(e.target.className)}
            >
              *학원 수{getSortIcon('academyCount')}
            </th>
            <th
              className='libraryCount'
              onClick={(e) => handleThClick(e.target.className)}
            >
              도서관 수{getSortIcon('libraryCount')}
            </th>
            <th
              className='busStation'
              onClick={(e) => handleThClick(e.target.className)}
            >
              버스정류장 수{getSortIcon('busStation')}
            </th>
            <th
              className='cultureCount'
              onClick={(e) => handleThClick(e.target.className)}
            >
              문화시설 수{getSortIcon('cultureCount')}
            </th>
            <th
              className='medicalCount'
              onClick={(e) => handleThClick(e.target.className)}
            >
              의료시설 수{getSortIcon('medicalCount')}
            </th>
            <th
              className='crimeRate'
              onClick={(e) => handleThClick(e.target.className)}
            >
              *범죄율
              {getSortIcon('crimeRate')}
              <br />
              (1,000명당)
            </th>
            <th
              className='youthRate'
              onClick={(e) => handleThClick(e.target.className)}
            >
              청년 비율
              {getSortIcon('youthRate')}
              <br />
              (19세~34세)
            </th>
            <th
              className='jeonseDeposit'
              onClick={(e) => handleThClick(e.target.className)}
            >
              전세 보증금
              {getSortIcon('jeonseDeposit')}
              <br />
              (평균)
            </th>
            <th
              className='monthDeposit'
              onClick={(e) => handleThClick(e.target.className)}
            >
              월세 보증금
              {getSortIcon('monthDeposit')}
              <br />
              (평균)
            </th>
            <th
              className='monthRent'
              onClick={(e) => handleThClick(e.target.className)}
            >
              월세가
              {getSortIcon('monthRent')}
              <br />
              (평균)
            </th>
            <th
              className='supermarket'
              onClick={(e) => handleThClick(e.target.className)}
            >
              대형마트,
              <br />
              백화점 수{getSortIcon('supermarket')}
            </th>
            <th
              className='parkRate'
              onClick={(e) => handleThClick(e.target.className)}
            >
              *공원 면적
              {getSortIcon('parkRate')}
              <br />
              (1인당)
            </th>
          </StyledLowerCategory>
        </thead>
        <StyeldData>
          {dongData.map((item) => (
            <tr key={`${item.gu} ${item.dong}`}>
              <td>{item.gu}</td>
              <td>{item.dong}</td>
              <td>
                {item.academyCount}개 ({item.academyCountRank}위)
              </td>
              <td>
                {item.libraryCount}개 ({item.libraryCountRank}위)
              </td>
              <td>
                {item.busStation}개 ({item.busStationRank}위)
              </td>
              <td>
                {item.cultureCount}개 ({item.cultureCountRank}위)
              </td>
              <td>
                {item.medicalCount}개 ({item.medicalCountRank}위)
              </td>
              <td>
                {item.crimeRate.toFixed(1)}% ({item.crimeRateRank}위)
              </td>
              <td>
                {item.youthRate.toFixed(1)}% ({item.youthRateRank}위)
              </td>
              <td>
                {numberToKoreanCurreny(item.jeonseDeposit.toFixed()) ||
                  '자료 없음'}
              </td>
              <td>
                {numberToKoreanCurreny(item.monthDeposit.toFixed()) ||
                  '자료 없음'}
              </td>
              <td>
                {numberToKoreanCurreny(item.monthRent.toFixed()) || '자료 없음'}
              </td>
              <td>
                {item.supermarket}개 ({item.supermarketRank}위)
              </td>
              <td>
                {item.parkRate.toFixed(1)}㎡ ({item.parkRateRank}위)
              </td>
            </tr>
          ))}
        </StyeldData>
        <tbody>
          {whitespace(dongData)}
          <tr>
            <StyledPagenation colSpan='14'>
              <TotalPagenation />
            </StyledPagenation>
          </tr>
        </tbody>
      </StyledTable>
      <StyledDescription>
        * 학원 수, 공원면적(1인당), 범죄율(1,000명당) 자료는 법정동 별로 된
        자료가 존재하지 않아서, 자치구 자료로 대체함
      </StyledDescription>
      <StyledDescription>
        * 학원 수, 공원면적(1인당), 범죄율(1,000명당) 자료는 법정동 별로 된
        자료가 존재하지 않아서, 자치구 자료로 대체함
      </StyledDescription>
    </>
  );
}

const StyledTable = styled.table`
  font-size: 14px;
  border: 1px solid #d2d2d2;
  th {
    border-color: #bdbdbd;
    border-width: 1px 0;
    white-space: pre-line;
    padding: 8px;
    background-color: #e6e6e6;
    width: 120px;
  }

  td {
    border-color: #d2d2d2;
    font-size: 13px;
    padding: 10px;
    height: 43px;
  }

  .whitespace {
    pointer-events: none;
    border: 0;
    height: 43px;
  }
`;

const StyledLowerCategory = styled.tr`
  cursor: pointer;
`;

const StyeldData = styled.tbody`
  td {
    border-width: 0 0px 1px;
  }
  tr:hover {
    background-color: #e6e6e6;
  }
`;

const StyledPagenation = styled.td`
  text-align: right;
  span {
    padding-right: 10px;
    font-size: 14px;
  }
  button {
    border: none;
    background: none;
    width: 18px;
  }
  button:nth-child(4) {
    padding-right: 25px;
  }
  button:nth-child(6) {
    padding-right: 25px;
  }
`;

const StyledDescription = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-style: italic;
  text-align: right;
  color: #757575;
`;

export default TotalTable;
