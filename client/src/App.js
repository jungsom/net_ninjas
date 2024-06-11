import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Analysis from './components/AnalysisCharts';
import Total from './components/Total';
import Recommend from './components/Recommend';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/total' element={<Total />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/recommend' element={<Recommend />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
