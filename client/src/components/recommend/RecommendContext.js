import { createContext } from 'react';

// Provider에서 fetch해온 data를 결과창으로 보내주기 위해 useContext를 이용함
const RecommendContext = createContext();

export default RecommendContext;
