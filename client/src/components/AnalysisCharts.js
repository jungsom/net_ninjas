import React, { useState } from 'react';
// import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
// import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
`;

const StyledNavLink = styled(Nav.Link)`
  color: black;
  &:hover,
  &:focus,
  &.active {
    color: #5fc3c8;
  }
`;

export default function AnalysisCharts() {
  const [activeKey, setActiveKey] = useState('education');
  return (
    <Container>
      <Nav
        variant='underline'
        defaultActiveKey='education'
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >
        <Nav.Item>
          <StyledNavLink
            eventKey='education'
            activeKey={activeKey === 'education'}
          >
            교육
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink
            eventKey='transportation'
            activeKey={activeKey === 'transportation'}
          >
            교통
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink eventKey='welfare' activeKey={activeKey === 'welfare'}>
            복지
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink eventKey='safety' activeKey={activeKey === 'safety'}>
            안전
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink
            eventKey='population'
            activeKey={activeKey === 'population'}
          >
            인구
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink eventKey='housing' activeKey={activeKey === 'housing'}>
            주거
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink
            eventKey='convenience'
            activeKey={activeKey === 'convenience'}
          >
            편의
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink
            eventKey='environment'
            activeKey={activeKey === 'environment'}
          >
            환경
          </StyledNavLink>
        </Nav.Item>
      </Nav>
      <ContentContainer>
        {activeKey === 'education' && <Education />}
        {activeKey === 'transportation' && <Transportation />}
        {activeKey === 'welfare' && <Welfare />}
        {activeKey === 'safety' && <Safety />}
        {activeKey === 'population' && <Population />}
        {activeKey === 'housing' && <Housing />}
        {activeKey === 'convenience' && <Convenience />}
        {activeKey === 'environment' && <Environment />}
      </ContentContainer>
    </Container>
  );
}
