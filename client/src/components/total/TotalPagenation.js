import { useContext } from 'react';
import TotalContext from './TotalContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TotalPagenation() {
  const { page, setPage } = useContext(TotalContext);

  const dongDataLengthTest = 95;

  const maxPage = Math.ceil(dongDataLengthTest / 20);

  const startNum = page === 1 ? 1 : 1 * 20 * (page - 1);
  const endNum =
    page === 1
      ? 20
      : 20 * page < dongDataLengthTest
      ? 20 + 20 * (page - 1)
      : dongDataLengthTest;

  return (
    <>
      <span>
        {startNum} ~ {endNum}
      </span>
      <span>
        {page} 페이지 / {maxPage} 페이지
      </span>

      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        <ChevronRightIcon />
      </button>
    </>
  );
}

export default TotalPagenation;
