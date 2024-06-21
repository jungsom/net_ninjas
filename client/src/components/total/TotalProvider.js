import TotalContext from './TotalContext';
import { useState, useEffect } from 'react';
import baseAxios from '../shared/api';
import qs from 'qs';

// TotalProvider를 이용해 data 값을 제공해 줌
function TotalProvider({ children }) {
  const [dongData, setDongData] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [keyword, setKeyword] = useState('');
  const [dataLength, setDataLength] = useState(0);
  const [jeonseDeposit, setJeonseDeposit] = useState(0);
  const [monthDeposit, setMonthDeposit] = useState(0);
  const [rent, setRent] = useState(0);

  const queryString = qs.stringify({
    keyword: keyword,
    pageNo: page,
    column: sortColumn,
    sorting: sort,
    jeonseMinDeposit: jeonseDeposit,
    monthMinDeposit: monthDeposit,
    minRent: rent
  });

  const getTotalData = async () => {
    try {
      let response;
      if (keyword.length > 1) {
        response = await baseAxios.get(`/allResearch/search?${queryString}`);
      }
      if (keyword.length === 0) {
        response = await baseAxios.get(`/allResearch?${queryString}`);
      }
      setDongData(response.data.paginatedData);
      setDataLength(response.data.totalData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTotalData();
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
        dataLength,
        setJeonseDeposit,
        setMonthDeposit,
        setRent
      }}
    >
      {children}
    </TotalContext.Provider>
  );
}

export default TotalProvider;
