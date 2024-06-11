import RecommendInputArea from './recommend/RecommendInputArea';
import RecommendProvider from './recommend/RecommendProvider';
import RecommendResult from './recommend/RecommendResult';

function Recommend() {
  return (
    <RecommendProvider>
      <RecommendInputArea />
    </RecommendProvider>
  );
}
export default Recommend;
