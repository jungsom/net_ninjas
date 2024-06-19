import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
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
          </Nav>
          <Nav>
            <Nav.Link href='/user/register'>회원가입</Nav.Link>
            <Nav.Link href='/user/login'>로그인</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
