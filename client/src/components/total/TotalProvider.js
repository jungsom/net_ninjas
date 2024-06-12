import TotalContext from './TotalContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

// TotalProvider를 이용해 data 값을 제공해 줌
function TotalProvider({ children }) {
  const [dongData, setDongData] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const data = async () => {
      try {
        if (keyword.length > 1) {
          const response = await axios.get(
            `http://localhost:8080/allResearch/search?keyword=${keyword}&pageNo=${page}&column=${sortColumn}&sorting=${sort}`
          );
          console.log(response.data);
          setDongData(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:8080/allResearch?pageNo=${page}&column=${sortColumn}&sorting=${sort}`
          );
          console.log(response.data);
          setDongData(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    data();
  }, [
    page,
    setPage,
    sortColumn,
    setSortColumn,
    sort,
    setSort,
    keyword,
    setKeyword
  ]);

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
        setSortColumn
      }}
    >
      {children}
    </TotalContext.Provider>
  );
}

export default TotalProvider;
