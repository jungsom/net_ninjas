import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import ChartsNavBar from './components/analysisCharts/chartsNavBar';
import Home from './components/Home';
import AnalysisCharts from './components/AnalysisCharts';
import Total from './components/Total';
import Recommend from './components/Recommend';
import Footer from './components/Footer';
import RecommendResult from './components/recommend/RecommendResult';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

// function App() {
//   const location = useLocation();

//   return (
//     <PageWrapper className='App'>
//       <Router>
//         <Header />
//         {location.pathname === '/analysis' && <ChartsNavBar />}
//         <MainContent>
//           <Routes>
//             <Route path='/home' element={<Home />} />
//             <Route path='/total' element={<Total />} />
//             <Route path='/analysis' element={<AnalysisCharts />} />
//             <Route path='/recommend' element={<Recommend />} />
//             <Route path='/recommend/result' element={<RecommendResult />} />
//           </Routes>
//         </MainContent>
//         <Footer />
//       </Router>
//     </PageWrapper>
//   );
// }

// export default App;

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname === '/analysis' && <ChartsNavBar />}
      <MainContent>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/total' element={<Total />} />
          <Route path='/analysis' element={<AnalysisCharts />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/recommend/result' element={<RecommendResult />} />
        </Routes>
      </MainContent>
      <Footer />
    </>
  );
}

function App() {
  return (
    <PageWrapper className='App'>
      <Router>
        <AppContent />
      </Router>
    </PageWrapper>
  );
}

export default App;
