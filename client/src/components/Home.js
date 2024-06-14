import styled from 'styled-components';
// import Container from 'react-bootstrap/Container';
import Slider from './home/slider';
import Content from './home/content';

const Container = styled.section`
  width: 100%;
`;

export default function Home() {
  return (
    <Container>
      <Slider />
      <Content />
    </Container>
  );
}
