import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import GuinfoCarouselsList from './GuinfoCarouselsList';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  // border-radius: 10px;
  object-fit: cover; /* 이미지가 부모 요소를 채우도록 */
  border-radius: 35px;
`;

const ImageWrapper = styled.div`
  width: 100%; /* 부모 요소의 너비 설정 */
  height: 500px; /* 부모 요소의 높이 설정 */
  overflow: hidden; /* 자식 이미지가 벗어나지 않도록 설정 */
`;

const baseURL =
  'https://ctatxiqcizqokmjdikym.supabase.co/storage/v1/object/public/img/recommend';

function GuInfoCarousels({ guName }) {
  return (
    <Carousel slide={false} style={{ marginTop: '20px' }}>
      <Carousel.Item interval={6000}>
        <ImageWrapper>
          <StyledImage
            src={`${baseURL}/${GuinfoCarouselsList[guName]?.name}00.jpg`}
          />
          {/* <ExampleCarouselImage text='First slide' /> */}
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{GuinfoCarouselsList[guName]?.place1}</h3>
          <p>{GuinfoCarouselsList[guName]?.description1}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        {/* <ExampleCarouselImage text='Second slide' /> */}
        <ImageWrapper>
          <StyledImage
            src={`${baseURL}/${GuinfoCarouselsList[guName]?.name}01.jpg`}
          />
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{GuinfoCarouselsList[guName]?.place2}</h3>
          <p>{GuinfoCarouselsList[guName]?.description2}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text='Third slide' /> */}
        <ImageWrapper>
          <StyledImage
            src={`${baseURL}/${GuinfoCarouselsList[guName]?.name}02.jpg`}
          />
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{GuinfoCarouselsList[guName]?.place3}</h3>
          <p>{GuinfoCarouselsList[guName]?.description3}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default GuInfoCarousels;
