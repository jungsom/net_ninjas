import TotalTable from "../total/TotalTable";
import TotalSearch from "../total/TotalSearch";
import TotalProvider from "../total/TotalProvider";
import TotalFetchData from "../total/TotalFetchData";

function Total() {
  return (
    <TotalProvider>
      <TotalFetchData />
      <TotalSearch />
      <TotalTable />
    </TotalProvider>
  );
}

export default Total;
