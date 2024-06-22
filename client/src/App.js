import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AnalysisCharts from './components/AnalysisCharts';
import TotalStatistics from './components/TotalStatistics';
import Recommend from './components/Recommend';
import Footer from './components/Footer';
import RecommendResult from './components/recommend/RecommendResult';
import GuInformation from './components/GuInformation';
import Board from './components/Board';
import MyPage from './components/MyPage';
import EditMyInformation from './components/EditMyInformation';
import TotalStatisticsProvider from './components/totalStatistics/TotalStatisticsProvider';
import NotFound from './components/NotFound';
import ScrollTriggerDemo from './components/ScrollTriggerDemo';
import RecommendNotFound from './components/recommend/RecommendNotFound';
import TotalStatisticsMobile from './components/totalStatistics/TotalStatisticsMobile';

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

function AppContent() {
  const location = useLocation();

  return (
    <TotalStatisticsProvider>
      <Header />
      <MainContent>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/gu_info' element={<GuInformation />} />
          <Route path='/totalStatistics' element={<TotalStatistics />} />
          <Route path='/analysis' element={<AnalysisCharts />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/recommend/result' element={<RecommendResult />} />
          <Route path='/board' element={<Board />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/ScrollTriggerDemo' element={<ScrollTriggerDemo />} />
          <Route path='/EditMyInformation' element={<EditMyInformation />} />
          <Route path='/recommend/notFound' element={<RecommendNotFound />} />
          <Route
            path='/totalStatistics/mobile'
            element={<TotalStatisticsMobile />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainContent>
      <Footer />
    </TotalStatisticsProvider>
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
