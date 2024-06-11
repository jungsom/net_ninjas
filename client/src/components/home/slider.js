import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

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

export default function Slider() {
  return (
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
          <h3>청계천</h3>
          <p>서울특별시 종로구</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text='Third slide' /> */}
        <ImageWrapper>
          <StyledImage src='img/seoul02.jpg' />
        </ImageWrapper>
        <Carousel.Caption>
          <h3>창경궁</h3>
          <p>서울특별시 종로구 창경궁로 185</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
