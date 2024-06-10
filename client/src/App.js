import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Analysis from './components/AnalysisCharts';
import Total from './components/Total';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/total' element={<Total />} />
          <Route path='/analysis' element={<Analysis />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
