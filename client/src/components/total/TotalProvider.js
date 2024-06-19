import TotalContext from './TotalContext';
import { useState, useEffect } from 'react';
import baseAxios from '../shared/api';

// TotalProvider를 이용해 data 값을 제공해 줌
function TotalProvider({ children }) {
  const [dongData, setDongData] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [keyword, setKeyword] = useState('');
  const [dataLength, setDataLength] = useState(0);

  const getTotalData = async () => {
    try {
      if (keyword.length > 1) {
        const response = await baseAxios.get(
          `/allResearch/search?keyword=${keyword}&pageNo=${page}&column=${sortColumn}&sorting=${sort}`
        );
        setDongData(response.data.paginatedData);
        setDataLength(response.data.totalData);
      } else {
        const response = await baseAxios.get(
          `/allResearch?pageNo=${page}&column=${sortColumn}&sorting=${sort}`
        );
        setDongData(response.data.paginatedData);
        setDataLength(response.data.totalData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTotalData();
    console.log(dongData);
  }, [page, sortColumn, sort, keyword]);

  return (
    <TotalContext.Provider
      value={{
        dongData,
        setDongData,
        keyword,
        setKeyword,
        page,
        setPage,
        sort,
        setSort,
        sortColumn,
        setSortColumn,
        dataLength
      }}
    >
      {children}
    </TotalContext.Provider>
  );
}

export default TotalProvider;
