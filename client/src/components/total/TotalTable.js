import styled from 'styled-components';
import { useContext } from 'react';
import TotalContext from './TotalContext';
import TotalNumberHandler from './TotalNumberHandler';
import TotalPagenation from './TotalPagenation';

// MUI Datagrid가 TypeScript만 지원해서 테이블을 이용해서 구현함
function TotalTable() {
  const { dongData, sort, setSort, sortColumn, setSortColumn } =
    useContext(TotalContext); // useContext를 이용해 Provider에서 data를 받아옴

  const roundedData = TotalNumberHandler(dongData, 1); // TotalNumberHandler 함수를 이용해서 숫자 표시 형식을 변경해줌, 숫자는 Rate 항목의 소수점 자리를 지정

  // 자료의 수가 20보다 적을 때 빈 행을 만들어 주는 함수
  function whitespace(dongData) {
    const count = dongData.length;
    const tag = [];
    for (let i = 0; i < 20 - count; i++) {
      tag.push(
        <tr className='whitespace'>
          <td colSpan='14'></td>
        </tr>
      );
    }
    return tag;
  }

  // column을 누르면 누른 곳의 className이름을 가져와서 기존의 sortColumn 값과 비교해서 정렬 방식을 결정하는 함수
  function sortDongColumnData(name) {
    if (name !== sortColumn) {
      // 다른 열을 눌렀을 경우 정렬이 안 되어 있었거나 내림차순이었으면, 오름차순으로 바꿔줌
      if (sort === 'DESC' || sort === '') {
        setSort('ASC');
      }
    } else {
      if (sort === '') {
        // 정렬이 안되어 있을 경우 오름차순으로
        setSort('ASC');
      } else if (sort === 'ASC') {
        setSort('DESC');
      } else if (sort === 'DESC') {
        setSort('');
      }
    }
  }
  return (
    <StyledTable>
      <thead>
        <tr>
          <th colSpan={2}>지역</th>
          <th colSpan={2}>교육</th>
          <th>환경</th>
          <th>안전</th>
          <th colSpan={2}>복지</th>
          <th colSpan={3}></th>
          <th>인구</th>
          <th>교통</th>
          <th>편의</th>
        </tr>
        <StyledLowerCategory>
          <th
            className='gu'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('gu');
            }}
          >
            구
            {sortColumn === 'gu' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'gu' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='dong'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('dong');
            }}
          >
            동
            {sortColumn === 'dong' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'dong' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='academyCount'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('academyCount');
            }}
          >
            학원 수
            {sortColumn === 'academyCount' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'academyCount' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='libraryCount'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('libraryCount');
            }}
          >
            도서관 수
            {sortColumn === 'libraryCount' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'libraryCount' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='parkRate'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('parkRate');
            }}
          >
            공원 면적
            {sortColumn === 'parkRate' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'parkRate' && sort === 'DESC'
              ? ' ▼'
              : ''}
            <br />
            (1인당)
          </th>
          <th
            className='crimeRate'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('crimeRate');
            }}
          >
            범죄율
            {sortColumn === 'crimeRate' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'crimeRate' && sort === 'DESC'
              ? ' ▼'
              : ''}
            <br />
            (1,000명당)
          </th>
          <th
            className='cultureCount'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('cultureCount');
            }}
          >
            문화시설 수
            {sortColumn === 'cultureCount' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'cultureCount' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='medicalCount'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('medicalCount');
            }}
          >
            의료시설 수
            {sortColumn === 'medicalCount' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'medicalCount' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='jeonseDeposit'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('jeonseDeposit');
            }}
          >
            전세 보증금
            {sortColumn === 'jeonseDeposit' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'jeonseDeposit' && sort === 'DESC'
              ? ' ▼'
              : ''}
            <br />
            (평균)
          </th>
          <th
            className='monthDeposit'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('monthDeposit');
            }}
          >
            월세 보증금
            {sortColumn === 'monthDeposit' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'monthDeposit' && sort === 'DESC'
              ? ' ▼'
              : ''}{' '}
            <br />
            (평균)
          </th>
          <th
            className='monthRent'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('monthRent');
            }}
          >
            월세가
            {sortColumn === 'monthRent' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'monthRent' && sort === 'DESC'
              ? ' ▼'
              : ''}{' '}
            <br />
            (평균)
          </th>
          <th
            className='youthRate'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('youthRate');
            }}
          >
            청년 비율
            {sortColumn === 'youthRate' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'youthRate' && sort === 'DESC'
              ? ' ▼'
              : ''}
            <br />
            (19세~34세)
          </th>
          <th
            className='busStation'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('busStation');
            }}
          >
            버스정류장 수
            {sortColumn === 'busStation' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'busStation' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
          <th
            className='supermarket'
            onClick={(e) => {
              sortDongColumnData(e.target.className);
              setSortColumn('supermarket');
            }}
          >
            대형마트,
            <br />
            백화점 수
            {sortColumn === 'supermarket' && sort === 'ASC'
              ? ' ▲'
              : sortColumn === 'supermarket' && sort === 'DESC'
              ? ' ▼'
              : ''}
          </th>
        </StyledLowerCategory>
      </thead>
      <StyeldData>
        {roundedData.map((item) => (
          <tr key={`${item.regeion.gu} ${item.regeion.dong}`}>
            <td>{item.regeion.gu}</td>
            <td>{item.regeion.dong}</td>
            <td>{item.education.academyCount}개</td>
            <td>{item.education.libraryCount}개</td>
            <td>{item.environment.parkRate}㎡</td>
            <td>{item.safety.crimeRate}%</td>
            <td>{item.welfare.cultureCount}개</td>
            <td>{item.welfare.medicalCount}개</td>
            <td>{item.housing.jeonseDeposit}</td>
            <td>{item.housing.monthDeposit}</td>
            <td>{item.housing.monthRent}</td>
            <td>{item.population.youthRate}%</td>
            <td>{item.transportation.busStation}개</td>
            <td>{item.convenience.supermarket}</td>
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
    width: 110px;
  }

  td {
    border-color: #d2d2d2;
    font-size: 13px;
    padding: 8px;
    height: 37px;
  }

  .whitespace {
    pointer-events: none;
    border: 0;
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
    padding-right: 15px;
    font-size: 14px;
  }
  button {
    border: none;
    background: none;
    width: 30px;
  }
  button:nth-child(4) {
    padding-right: 40px;
  }
`;

export default TotalTable;
