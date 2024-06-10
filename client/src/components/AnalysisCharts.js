import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Education from './analysisCharts/education';
import Transfortation from './analysisCharts/transfortation';
import Welfare from './analysisCharts/welfare';
import Safety from './analysisCharts/safety';
import Population from './analysisCharts/populaton';
import Housing from './analysisCharts/housing';
import Convenience from './analysisCharts/convenience';
import Environment from './analysisCharts/environment';

export default function Analysis() {
  return (
    <>
      <CssBaseline />
      <Navbar
        expand='lg'
        sticky='top'
        // className="bg-body-tertiary"
        // data-bs-theme="light"
        variant='light'
        style={{ backgroundColor: 'white' }}
      >
        <Container>
          <Nav defaultActiveKey='#education' className='justify-content-center'>
            <Nav.Item>
              <Nav.Link href='#education'>교육</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#traffic'>교통</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#welfare'>복지</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#safety'>안전</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#population'>인구</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#dwelling'>주거</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#convenience'>편의</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#environment'>환경</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container maxWidth='xl'>
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
        <Stack gap={3}>
          <div className='p-2'>
            <h4 id='education'>교육</h4>
            <Education />
          </div>
          <div className='p-2'>
            <h4 id='transfortation'>교통</h4>
            <Transfortation />
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
      </Container>
    </>
  );
}
