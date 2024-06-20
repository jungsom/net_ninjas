import RecommendContext from './RecommendContext';
import { useState } from 'react';
import baseAxios from '../shared/api';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

export const RECOMMEND_FUNNEL_STEP = {
  RECOMMEND_FIRST: 1,
  RECOMMEND_SECOND: 2,
  RECOMMEND_THIRD: 3,
  RECOMMEND_FOURTH: 4,
  RECOMMEND_FIFTH: 5,
  RECOMMEND_LOADING: 6
};

// TotalProvider를 이용해 data 값을 제공해 줌
function RecommendProvider({ children }) {
  const [recommendData, setRecommendData] = useState([]);
  const [firstCategory, setFirstCategory] = useState('');
  const [secondCategory, setSecondCategory] = useState('');
  const [thirdCategory, setThirdCategory] = useState('');
  const [contractType, setContractType] = useState('');
  const [deposit, setDeposit] = useState({
    min: 1,
    max: 1
  });
  const [rent, setRent] = useState({
    min: 1,
    max: 1
  });
  const [funnelStep, setFunnelStep] = useState(
    RECOMMEND_FUNNEL_STEP.RECOMMEND_FIRST
  );
  const navigate = useNavigate();

  const jeonseQueryString = qs.stringify({
    first: firstCategory,
    second: secondCategory,
    third: thirdCategory,
    option: contractType,
    min_price: deposit.min,
    max_price: deposit.max
  });

  const monthQueryString = qs.stringify({
    first: firstCategory,
    second: secondCategory,
    third: thirdCategory,
    option: contractType,
    min_price: deposit.min,
    max_price: deposit.max,
    min_price_2: rent.min,
    max_price_2: rent.max
  });

  const getRecommendData = async () => {
    let response;
    try {
      if (contractType === 'jeonse')
        response = await baseAxios.get(`/recommend?${jeonseQueryString}`);
      console.log(jeonseQueryString);
      if (contractType === 'month')
        response = await baseAxios.get(`/recommend?${monthQueryString}`);
      console.log(monthQueryString);
      const data = response.data;
      console.log(data);
      setRecommendData(data);
      if (data?.first.length === 0) {
        navigate('/recommend/notFound');
      } else {
        navigate('/recommend/result', {
          state: {
            firstCategory,
            secondCategory,
            thirdCategory,
            recommendData: data
          }
        });
      }
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
        deposit,
        setDeposit,
        rent,
        setRent,
        funnelStep,
        setFunnelStep
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
}

export default RecommendProvider;
