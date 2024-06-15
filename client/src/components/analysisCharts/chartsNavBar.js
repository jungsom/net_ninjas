import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function ChartsNavBar() {
  return (
    <>
      <CssBaseline />
      <Navbar
        expand='lg'
        // sticky='top'
        // className="bg-body-tertiary"
        // data-bs-theme="light"
        variant='light'
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: 'white'
        }}
      >
        <Container>
          <Nav defaultActiveKey='#education' className='justify-content-center'>
            <Nav.Item>
              <Nav.Link href='#education'>교육</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#transfortation'>교통</Nav.Link>
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
              <Nav.Link href='#housing'>주거</Nav.Link>
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
    </>
  );
}
