import RecommendContext from './RecommendContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { min } from 'd3';

// TotalProvider를 이용해 data 값을 제공해 줌
function RecommendProvider({ children }) {
  const [recommendData, setRecommendData] = useState([]);
  const [firstCategory, setFirstCategory] = useState('');
  const [secondCategory, setSecondCategory] = useState('');
  const [thirdCategory, setThirdCategory] = useState('');
  const [contractType, setContractType] = useState('');
  const [minDeposit, setMinDeposit] = useState(0);
  const [maxDeposit, setMaxDeposit] = useState(0);
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(0);

  const navigate = useNavigate();

  const getRecommendData = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (contractType === 'jeonse') {
        // const response = await axios.get(
        //   `http://kdt-ai-10-team05.elicecoding.com:3000/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}`
        // );
        response = await axios.get(
          `http://localhost:8080/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}`
        );
        // console.log(response.data);
      }
      if (contractType === 'month') {
        // const response = await axios.get(
        //   `http://kdt-ai-10-team05.elicecoding.com:3000/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}&min_price_2=${minRent}&max_price_2=${maxRent}`
        // );
        response = await axios.get(
          `http://localhost:8080/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}&min_price_2=${minRent}&max_price_2=${maxRent}`
        );
        // console.log(response.data);
      }
      const data = response.data;
      setRecommendData(data);
      navigate('/recommend/result', {
        state: {
          firstCategory,
          secondCategory,
          thirdCategory,
          recommendData: data
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <RecommendContext.Provider
      value={{
        getRecommendData,
        recommendData,
        setRecommendData,
        firstCategory,
        setFirstCategory,
        secondCategory,
        setSecondCategory,
        thirdCategory,
        setThirdCategory,
        contractType,
        setContractType,
        minDeposit,
        setMinDeposit,
        maxDeposit,
        setMaxDeposit,
        minRent,
        setMinRent,
        maxRent,
        setMaxRent
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
}

export default RecommendProvider;
