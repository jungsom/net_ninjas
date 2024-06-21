import styled from 'styled-components';
// import Container from 'react-bootstrap/Container';
import Slider from './home/slider';
// import Content from './home/content';
import Stack from 'react-bootstrap/Stack';
import { ReactComponent as GuInfo } from './home/guInfo.svg';
import { ReactComponent as Total } from './home/total.svg';
import { ReactComponent as Analysis } from './home/analysis.svg';
import { ReactComponent as Recommend } from './home/recommend.svg';
// import { ReactComponent as Arrow } from './home/arrow.svg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .home_logo {
    width: 100%;
    background-image: url('img/background.png'); /* 이미지 파일 경로 설정 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    .sub_title,
    .title {
      position: absolute;
      left: 50%;
      width: 15em;
      transform: translate(-50%, -50%);
    }

    .arrow {
      position: absolute;
      width: 3em;
      left: 50%;
      bottom: 10%;
      opacity: 0;
      transform: translate(-50%, -50%);
      animation: bounce 2s infinite; /* bounce 애니메이션 적용 */
      animation-delay: 2.5s;
    }

    .sub_title {
      opacity: 0;
      animation: fadeSlideDown2 1s ease-out forwards;
      animation-delay: 0.5s;
    }

    .title {
      width: 20em;
      opacity: 0;
      animation: fadeSlideDown1 1s ease-out forwards;
      animation-delay: 1.5s;
    }

    @keyframes fadeSlideDown1 {
      0% {
        top: 40%;
        opacity: 0;
      }
      100% {
        top: 50%;
        opacity: 1;
      }
    }

    @keyframes fadeSlideDown2 {
      0% {
        top: 28%;
        opacity: 0;
      }
      100% {
        top: 38%;
        opacity: 1;
      }
    }

    @keyframes bounce {
      0%,
      100% {
        opacity: 1;
        transform: translate(-50%, -50%); /* 초기 위치 */
      }
      50% {
        transform: translate(-50%, -10%); /* 위로 튕김 */
      }
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.25em;
  padding: 10px;

  &.hidden {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 2s, transform 1.5s;
  }

  &.visible {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 2s, transform 1.5s;
  }
`;

const TitleWrapper = styled.section`
  h5 {
    color: #5fc3c8;
    font-weight: bolder;
  }
  h1 {
    font-weight: bolder;
  }
  p {
    margin-bottom: 50px;
  }
`;

const ImageWrapper = styled.div`
  padding-left: 20%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Content = ({ subTitle, title, link, text }) => {
  return (
    <TitleWrapper>
      <h5>{subTitle}</h5>
      <StyledLink to={link}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>{title}</h1>
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
    </TitleWrapper>
  );
};

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({});
  const sections = [
    { id: 'target1' },
    { id: 'target2' },
    { id: 'target3' },
    { id: 'target4' }
  ];

  const heightOffset = 200;
  const topHeight = 60;

  const handleScroll = () => {
    const updatedVisibleSections = {};
    sections.forEach((section) => {
      const targetSection = document.getElementById(section.id);
      const position = targetSection.getBoundingClientRect();

      if (
        position.top + heightOffset < window.screen.height &&
        position.bottom >= 0
      ) {
        updatedVisibleSections[section.id] = true;
      } else {
        updatedVisibleSections[section.id] = false;
      }
    });
    setVisibleSections(updatedVisibleSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      {/* <Slider /> */}
      <div
        className='home_logo'
        style={{ height: window.screen.height - heightOffset }}
      >
        <img className='sub_title' src='img/sub_title.svg' />
        <img className='title' src='img/title.svg' />
        <img className='arrow' src='img/arrow_bottom.svg' />
      </div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: '100%',
          height: window.screen.height - heightOffset,
          top: window.screen.height - heightOffset + topHeight,
          zIndex: '-1'
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#F4FEFF',
          width: '100%',
          height: window.screen.height - heightOffset,
          top: (window.screen.height - heightOffset) * 2 + topHeight,
          zIndex: '-1'
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: '100%',
          height: window.screen.height - heightOffset,
          top: (window.screen.height - heightOffset) * 3 + topHeight,
          zIndex: '-1'
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#F4FEFF',
          width: '100%',
          height: window.screen.height - heightOffset,
          top: (window.screen.height - heightOffset) * 4 + topHeight,
          zIndex: '-1'
        }}
      ></div>

      {/* //  display: flex;
  justify-content: center;
  flex-direction: column; */}
      {/* <Content /> */}
      <Stack
        gap={0}
        justifyContent='center'
        alignItems='center'
        style={{
          marginBottom: '100px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ContentWrapper
          id='target1'
          style={{ height: window.screen.height - heightOffset }}
          className={`${visibleSections['target1'] ? 'visible' : 'hidden'}`}
        >
          <Content
            subTitle={'자치구 정보'}
            title={'내가 살고 싶은 동네가 속한 자치구의 정보'}
            link={'/gu_info'}
            text={'해당 자치구의 가볼만한 곳과 주요 상권을 알아볼 수 있어요.'}
          />
          <ImageWrapper>
            <GuInfo style={{ width: '80%' }} />
          </ImageWrapper>
        </ContentWrapper>

        <ContentWrapper
          id='target2'
          style={{ height: window.screen.height - heightOffset }}
          className={`${visibleSections['target2'] ? 'visible' : 'hidden'}`}
        >
          <Content
            subTitle={'전체 통계'}
            title={'서울의 모든 동네 정보를 한눈에'}
            link={'/total'}
            text={
              '내가 살고 싶은 동네의 학원 수는? 범죄율은?\n내가 궁금했던 동네의 정보를 확인할 수 있어요.'
            }
          />
          <ImageWrapper>
            <Total style={{ margin: '0 auto' }} />
          </ImageWrapper>
        </ContentWrapper>
        <ContentWrapper
          id='target3'
          style={{ height: window.screen.height - heightOffset }}
          className={`${visibleSections['target3'] ? 'visible' : 'hidden'}`}
        >
          <Content
            subTitle={'통계 분석'}
            title={'8개의 카테고리로 보기 편한 차트 분석'}
            link={'/analysis'}
            text={
              '동네의 주요 정보들을 8개의 카테고리로 나누어 보았어요.\n제일 안전한 동네, 복지가 제일 좋은 동네 등이 어디인지 알아볼 수 있어요.'
            }
          />
          <ImageWrapper>
            <Analysis style={{ margin: '0 auto' }} />
          </ImageWrapper>
        </ContentWrapper>
        <ContentWrapper
          id='target4'
          style={{ height: window.screen.height - heightOffset }}
          className={`${visibleSections['target4'] ? 'visible' : 'hidden'}`}
        >
          <Content
            subTitle={'동네 추천'}
            title={'나에게 가장 맞는 동네 추천 받기'}
            link={'/recommend'}
            text={
              '동네에서 가장 중요하게 생각하는 기준이 있나요?\n동잇에게 알려주시면 해당 정보를 바탕으로 동네를 추천해드려요.'
            }
          />
          <ImageWrapper>
            <Recommend style={{ margin: '0 auto' }} />
          </ImageWrapper>
        </ContentWrapper>
      </Stack>
    </Container>
  );
}
