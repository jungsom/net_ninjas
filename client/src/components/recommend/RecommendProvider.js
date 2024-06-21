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
    min: '',
    max: ''
  });
  const [rent, setRent] = useState({
    min: '',
    max: ''
  });
  const [funnelStep, setFunnelStep] = useState(
    RECOMMEND_FUNNEL_STEP.RECOMMEND_FIRST
  );
  const navigate = useNavigate();

  const min_deposit = Number(deposit.min.replaceAll(',', ''));
  const max_deposit = Number(deposit.max.replaceAll(',', ''));
  const min_rent = Number(rent.min.replaceAll(',', ''));
  const max_rent = Number(rent.max.replaceAll(',', ''));

  const jeonseQueryString = qs.stringify({
    first: firstCategory,
    second: secondCategory,
    third: thirdCategory,
    option: contractType,
    min_price: min_deposit,
    max_price: max_deposit
  });

  const monthQueryString = qs.stringify({
    first: firstCategory,
    second: secondCategory,
    third: thirdCategory,
    option: contractType,
    min_price: min_deposit,
    max_price: max_deposit,
    min_price_2: min_rent,
    max_price_2: max_rent
  });

  const getRecommendData = async () => {
    let response;
    try {
      if (contractType === 'jeonse')
        response = await baseAxios.get(`/recommend?${jeonseQueryString}`);
      if (contractType === 'month')
        response = await baseAxios.get(`/recommend?${monthQueryString}`);
      const data = response.data;
      setRecommendData(data);
      if (data?.first.length === 0) {
        navigate('/recommend/notFound');
      } else {
        navigate('/recommend/result', {
          state: {
            firstCategory,
            secondCategory,
            thirdCategory,
            contractType,
            deposit,
            rent,
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
