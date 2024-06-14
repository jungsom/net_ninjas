import React from 'react';
// import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
// import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';

import Education from './analysisCharts/education';
import Transportation from './analysisCharts/transportation';
import Welfare from './analysisCharts/welfare';
import Safety from './analysisCharts/safety';
import Population from './analysisCharts/populaton';
import Housing from './analysisCharts/housing';
import Convenience from './analysisCharts/convenience';
import Environment from './analysisCharts/environment';

const Container = styled.section`
  width: 90%;
  margin-top: 20px;
`;

export default function AnalysisCharts() {
  return (
    <Container>
      <Tabs
        defaultActiveKey='education'
        id='justify-tab-example'
        className='mb-3'
        justify
      >
        <Tab eventKey='education' title='&#127890; 교육'>
          <Education />
        </Tab>
        <Tab eventKey='profile' title='&#128652; 교통'>
          <Transportation />
        </Tab>
        <Tab eventKey='longer-tab' title='&#128153; 복지'>
          <Welfare />
        </Tab>
        <Tab eventKey='satety' title='&#128680; 안전'>
          <Safety />
        </Tab>
        <Tab eventKey='population' title='&#128106; 인구'>
          <Population />
        </Tab>
        <Tab eventKey='housing' title='&#127968; 주거'>
          <Housing />
        </Tab>
        <Tab eventKey='convenience' title='&#127978; 편의'>
          <Convenience />
        </Tab>
        <Tab eventKey='environment' title='&#127795; 환경'>
          <Environment />
        </Tab>
      </Tabs>
    </Container>
  );
}

// export default function AnalysisCharts() {
//   return (
//     <Stack gap={3}>
//       <div className='p-2' id='education'>
//         <h4>교육</h4>
//         <Education />
//       </div>
//       <div className='p-2' id='transfortation'>
//         <h4>교통</h4>
//         <Transportation />
//       </div>
//       <div className='p-2'>
//         <h4 id='welfare'>복지</h4>
//         <Welfare />
//       </div>
//       <div className='p-2'>
//         <h4 id='safety'>안전</h4>
//         <Safety />
//       </div>
//       <div className='p-2'>
//         <h4 id='population'>인구</h4>
//         <Population />
//       </div>
//       <div className='p-2'>
//         <h4 id='housing'>주거</h4>
//         <Housing />
//       </div>
//       <div className='p-2'>
//         <h4 id='convenience'>편의</h4>
//         <Convenience />
//       </div>
//       <div className='p-2'>
//         <h4 id='environment'>환경</h4>
//         <Environment />
//       </div>
//     </Stack>
//   );
// }
