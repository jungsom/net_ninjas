import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

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
        <Navbar.Brand href='/'>동네잇유</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {/* <Nav.Link href='/home'>Home</Nav.Link> */}
            <Nav.Link href='/gu_info'>자치구 정보</Nav.Link>
            <Nav.Link href='/recommend'>추천</Nav.Link>
            <NavDropdown title='통계' id='collapsible-nav-dropdown'>
              <NavDropdown.Item href='/total'>전체 통계</NavDropdown.Item>
              <NavDropdown.Item href='/analysis'>통계 분석</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link href='/board'>게시판</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
