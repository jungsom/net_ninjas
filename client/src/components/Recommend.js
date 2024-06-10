import RecommendInputArea from './recommend/RecommendInputArea';
import RecommendProvider from './recommend/RecommendProvider';

function Recommend() {
  return (
    <RecommendProvider>
      <RecommendInputArea />
    </RecommendProvider>
  );
}
export default Recommend;
