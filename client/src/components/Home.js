import styled from 'styled-components';
// import Container from 'react-bootstrap/Container';
import Slider from './home/slider';
// import Content from './home/content';
import Stack from 'react-bootstrap/Stack';
import { ReactComponent as GuInfo } from './home/guInfo.svg';
import { ReactComponent as Total } from './home/total.svg';
// import { ReactComponent as Arrow } from './home/arrow.svg';
import { Link } from 'react-router-dom';

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const TitleWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ContentWrapper = styled.section`
  h5 {
    color: #5fc3c8;
    font-weight: bolder;
  }
  h2 {
    font-weight: bolder;
  }
  p {
    margin-bottom: 50px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Content = ({ subTitle, title, link, text }) => {
  return (
    <ContentWrapper>
      <h5>{subTitle}</h5>
      <StyledLink to={link}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{title}</h2>
          <img
            src='img/arrow.png'
            style={{ marginLeft: '50px', marginBottom: '9px', width: '17px' }}
          />
        </div>
      </StyledLink>
      <p>
        {text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      {/* <img src='' */}
    </ContentWrapper>
  );
};

export default function Home() {
  return (
    <Container>
      {/* <Slider /> */}
      <StyledImage src='img/main.png' />
      {/* <Content /> */}
      <Stack
        gap={5}
        justifyContent='center'
        alignItems='center'
        style={{ marginTop: '50px' }}
      >
        <TitleWrapper>
          <Content
            subTitle={'자치구 정보'}
            title={'내가 살고 싶은 동네가 속한 자치구의 정보'}
            link={'/gu_info'}
            text={'해당 자치구의 가볼만한 곳과 주요 상권을 알아볼 수 있어요.'}
          />
          <GuInfo style={{ margin: '0 auto' }} />
        </TitleWrapper>
        <TitleWrapper>
          <Content
            subTitle={'전체 통계'}
            title={'서울의 모든 동네 정보를 한눈에'}
            link={'/total'}
            text={
              '내가 살고 싶은 동넨의 학원 수는? 범죄율은?\n내가 궁금했던 동네의 정보를 확인할 수 있어요.'
            }
          />
          <Total style={{ margin: '0 auto' }} />
        </TitleWrapper>
        <TitleWrapper>
          <Content
            subTitle={'통계 분석'}
            title={'8개의 카테고리로 보기 편한 차트 분석'}
            link={'/analysis'}
            text={
              '동네의 주요 정보들을 8개의 카테고리로 나누어 보았어요.\n제일 안전한 동네, 복지가 제일 좋은 동네 등이 어디인지 알아볼 수 있어요.'
            }
          />
        </TitleWrapper>
        <TitleWrapper>
          <Content
            subTitle={'동네 추천'}
            title={'나에게 가장 맞는 동네 추천 받기'}
            link={'/recommend'}
            text={
              '동네에서 가장 중요하게 생각하는 기준이 있나요?\n동잇에게 알려주시면 해당 정보를 바탕으로 동네를 추천해드려요.'
            }
          />
        </TitleWrapper>
      </Stack>
    </Container>
  );
}
