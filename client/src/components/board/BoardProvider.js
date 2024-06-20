import BoardContext from './BoardContext';
import { useState, useEffect } from 'react';
import baseAxios from '../shared/api';

// TotalProvider를 이용해 data 값을 제공해 줌
function BoardProvider({ children }) {
  const [boardContents, setBoardContents] = useState([]);

  const getBoardContents = async () => {
    try {
      const response = await baseAxios.get('/board');
      setBoardContents(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBoardContents();
  }, []);
  return (
    <BoardContext.Provider value={{ boardContents }}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
