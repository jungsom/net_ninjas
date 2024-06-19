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
import Register from './components/Register';
import Login from './components/Login';
import AnalysisCharts from './components/AnalysisCharts';
import Total from './components/Total';
import Recommend from './components/Recommend';
import Footer from './components/Footer';
import RecommendResult from './components/recommend/RecommendResult';
import GuInformation from './components/GuInformation';
import Board from './components/Board';
import MyPage from './components/MyPage';
import EditMyInformation from './components/EditMyInformation';
import TotalProvider from './components/total/TotalProvider';
import NotFound from './components/NotFound';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center; // 가로 가운데 정렬
  // align-items: center; // 세로 가운데 정렬
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
    <TotalProvider>
      <Header />
      {/* {location.pathname === '/analysis' && <ChartsNavBar />} */}
      <MainContent>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/gu_info' element={<GuInformation />} />
          <Route path='/total' element={<Total />} />
          <Route path='/analysis' element={<AnalysisCharts />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/recommend/result' element={<RecommendResult />} />
          <Route path='/board' element={<Board />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/EditMyInformation' element={<EditMyInformation />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainContent>
      <Footer />
    </TotalProvider>
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
