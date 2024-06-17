import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Component = () => {
  const [page, setPage] = useState(1);

  const onChangePage = (page: string) => {
    setPage(page);
  };

  const onClickPrevButton = () => {
    if (page === 1) {
      return;
    }

    setPage((prev) => prev - 1);
  };

  const onClickNextButton = () => {
    if (page === totalPage) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  // 단순히 페이지 버튼을 누르는게 있고
  return (
    <Pagination
      currentPage={page}
      onChangePage={onChangePage}
      onClickPrevButton={onClickPrevButton}
      onClickNextButton={onClickNextButton}
    />
  );
};

export default Component;
