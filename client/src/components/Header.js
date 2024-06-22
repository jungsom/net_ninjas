import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ReactComponent as DongIt } from './header/dong-it.svg';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const CustomNavLink = styled(NavLink)`
  transition: color 0.3s ease;
  color: black;
  text-decoration: none;
  margin-left: 20px;
  margin-right: 20px;

  &.active {
    color: #5fc3c8;
  }

  &:hover,
  &:focus {
    color: #5fc3c8;
  }
`;

export default function Header() {
  // const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // 쿠키에 토큰이 있는지 확인
  //   if (cookies.token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [cookies]);

  const location = useLocation();

  return (
    <Navbar
      sticky='top'
      collapseOnSelect
      expand='lg'
      className='bg-body-tertiary'
    >
      <Container
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint='sm'
      >
        <Navbar.Brand href='/'>
          <DongIt />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <CustomNavLink
              to='/gu_info'
              isActive={() => location.pathname === '/gu_info'}
            >
              자치구 정보
            </CustomNavLink>
            <CustomNavLink
              to='/recommend'
              isActive={() => location.pathname === '/recommend'}
            >
              동네 추천
            </CustomNavLink>
            <CustomNavLink
              to='/analysis'
              isActive={() => location.pathname === '/analysis'}
            >
              통계 분석
            </CustomNavLink>
            <CustomNavLink
              to='/totalStatistics'
              isActive={() => location.pathname === '/totalStatistics'}
            >
              전체 통계
            </CustomNavLink>
            {/* <Nav.Link href='/board'>게시판</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
