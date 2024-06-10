import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleMenu() {
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
        <Navbar.Brand href='#home'>동네잇유</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#features'>Home</Nav.Link>
            <NavDropdown title='통계' id='collapsible-nav-dropdown'>
              <NavDropdown.Item href='total'>전체 통계</NavDropdown.Item>
              <NavDropdown.Item href='analysis'>통계 분석</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='recommend'>추천</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='#deets'>로그인</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleMenu;
