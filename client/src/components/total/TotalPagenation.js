import { useContext } from 'react';
import TotalContext from './TotalContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight
} from 'react-bootstrap-icons';
import styled from 'styled-components';

function TotalPagenation() {
  const { dataLength, page, setPage } = useContext(TotalContext);

  // 최대 페이지는 데이터 개수를 20으로 나눈 후에 올림
  const maxPage = Math.ceil(dataLength / 20);

  const startNum = page === 1 ? 1 : 20 * (page - 1); // 1번 페이지일 때 시작 번호는 1,
  const endNum =
    maxPage === 1
      ? dataLength
      : 20 * page < dataLength
      ? 20 + 20 * (page - 1)
      : dataLength;

  return (
    <>
      <span>
        {startNum} ~ {endNum} ({dataLength})
      </span>
      <span>
        {page} 페이지 / {maxPage} 페이지
      </span>
      <button
        onClick={() => {
          if (page > 5) {
            setPage(page - 5);
          } else {
            setPage(1);
          }
        }}
        disabled={page === 1}
      >
        {page === 1 ? (
          <DisabledIcon>
            <ChevronDoubleLeft size={16} />
          </DisabledIcon>
        ) : (
          <ChevronDoubleLeft size={16} />
        )}
      </button>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        {page === 1 ? (
          <DisabledIcon>
            <ChevronLeft size={16} />
          </DisabledIcon>
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        {page === maxPage ? (
          <DisabledIcon>
            <ChevronRight size={16} />
          </DisabledIcon>
        ) : (
          <ChevronRight size={16} />
        )}
      </button>
      <button
        onClick={() => {
          if (page < maxPage - 5) {
            setPage(page + 5);
          } else {
            setPage(maxPage);
          }
        }}
        disabled={page === maxPage}
      >
        {page === maxPage ? (
          <DisabledIcon>
            <ChevronDoubleRight size={16} />
          </DisabledIcon>
        ) : (
          <ChevronDoubleRight size={16} />
        )}
      </button>
    </>
  );
}

const DisabledIcon = styled.div`
  svg {
    color: #ccc;
  }
`;

export default TotalPagenation;
