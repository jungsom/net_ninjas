import styled from "styled-components";
import { useContext } from "react";
import TotalContext from "./TotalContext";
import TotalNumberHandler from "./TotalNumberHandler";

// MUI Datagrid가 TypeScript만 지원해서 테이블을 이용해서 구현함
function TotalTable() {
  const { data } = useContext(TotalContext); // useContext를 이용해 다른 페이지에서 data를 받아옴

  const roundedData = TotalNumberHandler(data, 1); // TotalNumberHandler 함수를 이용해서 숫자 표시 형식을 변경해줌, 숫자는 Rate 항목의 소수점 자리를 지정

  return (
    <StyledTable>
      <thead>
        <tr id="upper_category">
          <th colSpan={2}>지역</th>
          <th colSpan={2}>교육</th>
          <th>환경</th>
          <th>안전</th>
          <th colSpan={2}>복지</th>
          <th colSpan={3}>주거</th>
          <th>인구</th>
          <th>교통</th>
          <th>편의</th>
        </tr>
        <tr id="lower_category">
          <th>구</th>
          <th>동</th>
          <th>학원 수</th>
          <th>도서관 수</th>
          <th>1인당 공원 면적</th>
          <th>
            범죄율
            <br />
            (인구 1,000명당)
          </th>
          <th>
            1인당
            <br />
            문화시설 수
          </th>
          <th>
            1인당
            <br />
            의료시설 수
          </th>
          <th>
            전세 보증금
            <br />
            (평균)
          </th>
          <th>
            월세 보증금 <br />
            (평균)
          </th>
          <th>
            월세가 <br />
            (평균)
          </th>
          <th>
            청년 비율
            <br />
            (19세~34세)
          </th>
          <th>버스정류장 수</th>
          <th>
            대형마트,
            <br />
            백화점 수
          </th>
        </tr>
      </thead>
      <tbody>
        {roundedData.map((item, index) => (
          <tr key={index}>
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
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  th {
    text-align: center;
    border: 1px solid;
    white-space: pre-line;
    padding: 8px;
  }

  #lower_category {
    cursor: pointer;
  }

  td {
    text-align: center;
    padding: 5px;
    border: 1px solid;
  }
`;

export default TotalTable;
