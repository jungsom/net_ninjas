import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";

function TotalSearch() {
  const [dong, setDong] = useState("");
  return (
    <>
      <InputBox
        name={"total_search"}
        placeholder="예) 역삼동, 명동, 장충동,..."
        value={dong}
        onChange={(e) => setDong(e.target.value)}
      />
      <Button
        icon="search.svg"
        label="검색"
        onClick={() => console.log(dong)}
      />
      <Button label="초기화" onClick={() => setDong("")} />
    </>
  );
}

export default TotalSearch;
