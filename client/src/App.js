import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Analysis from './components/AnalysisCharts';
import Total from './components/Total';
import Home from './components/Home';
import Recommend from './components/Recommend';
import Footer from './components/Footer';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <PageWrapper className='App'>
      <Router>
        <Header />
        <MainContent>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/total' element={<Total />} />
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/recommend' element={<Recommend />} />
          </Routes>
        </MainContent>
        <Footer />
      </Router>
    </PageWrapper>
  );
}

export default App;
