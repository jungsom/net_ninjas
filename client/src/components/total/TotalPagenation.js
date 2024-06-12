import { useContext } from 'react';
import TotalContext from './TotalContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TotalPagenation() {
  const { dongData, page, setPage } = useContext(TotalContext);

  const dongDataLength = dongData.length;

  const maxPage = Math.ceil(dongDataLength / 20);

  const startNum = page === 1 ? 1 : 1 * 20 * (page - 1);
  const endNum =
    maxPage === 1
      ? dongDataLength
      : 20 * page < dongDataLength
      ? 20 + 20 * (page - 1)
      : dongDataLength;

  // const endNum =  page === 1? 20: 20 * page < dongDataLength? 20 + 20 * (page - 1): dongDataLength;

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
