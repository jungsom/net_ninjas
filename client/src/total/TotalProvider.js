import TotalContext from "./TotalContext";
import { useState } from "react";

// TotalProvider를 이용해 data 값을 제공해 줌
function TotalProvider({ children }) {
  const [data, setData] = useState([]); // data의 초기 상태는 빈 배열

  return (
    <TotalContext.Provider value={{ data, setData }}>
      {children}
    </TotalContext.Provider>
  );
}

export default TotalProvider;
