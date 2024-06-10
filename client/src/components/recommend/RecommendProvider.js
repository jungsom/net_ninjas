import RecommendContext from './RecommendContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

// TotalProvider를 이용해 data 값을 제공해 줌
function RecommendProvider({ children }) {
  const [recommendData, setRecommendData] = useState([]);

  // // Axios 테스트
  // useEffect(() => {
  //   const data = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:8080/allResearch?perPage=20&pageNo=1'
  //       );
  //       console.log(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   data();
  // }, []);

  return (
    <RecommendContext.Provider
      value={{
        recommendData,
        setRecommendData
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
}

export default RecommendProvider;
