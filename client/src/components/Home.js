import Carousel from 'react-bootstrap/Carousel';
// import Container from '@mui/material/Container';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  // border-radius: 10px;
  object-fit: cover; /* 이미지가 부모 요소를 채우도록 */
`;

const ImageWrapper = styled.div`
  width: 100%; /* 부모 요소의 너비 설정 */
  height: 500px; /* 부모 요소의 높이 설정 */
  overflow: hidden; /* 자식 이미지가 벗어나지 않도록 설정 */
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column; /* 자식 요소들을 수직으로 나열 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  // height: 100vh; /* div가 화면 전체 높이를 차지하도록 설정 */
  text-align: center; /* 텍스트도 가운데 정렬 */
`;

function Home() {
  return (
    <>
      <Carousel slide={false}>
        <Carousel.Item interval={6000}>
          <ImageWrapper>
            <StyledImage src='img/seoul00.jpg' />
            {/* <ExampleCarouselImage text='First slide' /> */}
          </ImageWrapper>
          <Carousel.Caption>
            <h3>N서울타워</h3>
            <p>서울특별시 용산구 남산공원길 105</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={6000}>
          {/* <ExampleCarouselImage text='Second slide' /> */}
          <ImageWrapper>
            <StyledImage src='img/seoul01.jpg' />
          </ImageWrapper>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text='Third slide' /> */}
          <ImageWrapper>
            <StyledImage src='img/seoul02.jpg' />
          </ImageWrapper>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <StyledDiv>
        <h1>MZ 여러분, 서울에 오신 것을 환영합니다!</h1>
        <p>
          동네잇유가 여러분의 서울 정착을 도와드립니다. 서울에서 나에게 딱 맞는
          지역은 어디인지 탐색해보세요.
        </p>
        <Button variant='primary' href='recommend'>
          나에게 맞는 서울 동네 찾기
        </Button>
      </StyledDiv>
    </>
  );
}

export default Home;
