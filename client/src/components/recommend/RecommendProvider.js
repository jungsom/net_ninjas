import RecommendContext from './RecommendContext';
import { useState, useEffect } from 'react';
import baseAxios from '../shared/api';
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
  const [firstOpen, setFirstOpen] = useState(true);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [fourthOpen, setFourthOpen] = useState(false);
  const [fifthOpen, setFifthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getRecommendData = async () => {
    let response;
    try {
      if (contractType === 'jeonse') {
        response = await baseAxios.get(
          `/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}`
        );
        console.log(response.data);
      }
      if (contractType === 'month') {
        response = await baseAxios.get(
          `/recommend?first=${firstCategory}&second=${secondCategory}&third=${thirdCategory}&option=${contractType}&min_price=${minDeposit}&max_price=${maxDeposit}&min_price_2=${minRent}&max_price_2=${maxRent}`
        );
        console.log(response.data);
      }
      const data = response.data;
      console.log(data);
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
        setMaxRent,
        firstOpen,
        setFirstOpen,
        secondOpen,
        setSecondOpen,
        thirdOpen,
        setThirdOpen,
        fourthOpen,
        setFourthOpen,
        fifthOpen,
        setFifthOpen,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
}

export default RecommendProvider;
