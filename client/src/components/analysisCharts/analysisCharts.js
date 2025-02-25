import React from 'react';
// import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
// import styled from 'styled-components';

import Education from './education';
import Transportation from './transportation';
import Welfare from './welfare';
import Safety from './safety';
import Population from './populaton';
import Housing from './housing';
import Convenience from './convenience';
import Environment from './environment';

export default function AnalysisCharts() {
  return (
    <Stack gap={3}>
      <div className='p-2' id='education'>
        <h4>교육</h4>
        <Education />
      </div>
      <div className='p-2' id='transportation'>
        <h4>교통</h4>
        <Transportation />
      </div>
      <div className='p-2'>
        <h4 id='welfare'>복지</h4>
        <Welfare />
      </div>
      <div className='p-2'>
        <h4 id='safety'>안전</h4>
        <Safety />
      </div>
      <div className='p-2'>
        <h4 id='population'>인구</h4>
        <Population />
      </div>
      <div className='p-2'>
        <h4 id='housing'>주거</h4>
        <Housing />
      </div>
      <div className='p-2'>
        <h4 id='convenience'>편의</h4>
        <Convenience />
      </div>
      <div className='p-2'>
        <h4 id='environment'>환경</h4>
        <Environment />
      </div>
    </Stack>
  );
}
