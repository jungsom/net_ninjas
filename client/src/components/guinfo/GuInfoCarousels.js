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

function GuInfoCarousels({ guName }) {
  const category = {
    중구: {
      name: 'jungu',
      place1: '숭례문',
      description1: '서울특별시 중구 세종대로 40',
      place2: '동대문 디자인 플라자',
      description2: '서울특별시 중구 을지로 281',
      place3: '서울특별시청',
      description3: '서울시특별시 중구 세종대로 110'
    },
    종로구: {
      name: 'jongro',
      place1: '광화문',
      description1: '서울특별시 종로구 효자로 12',
      place2: '광화문광장',
      description2: '서울특별시 종로구 세종대로 175',
      place3: '북촌한옥마을',
      description3: '서울특별시 종로구 계동길 37'
    },
    용산구: {
      name: 'yongsan',
      place1: 'N서울타워',
      description1: '서울특별시 용산구 남산공원길 105',
      place2: '이촌한강공원',
      description2: '서울특별시 용산구 이촌로72길 62 ',
      place3: '용산전자상가',
      description3: '서울특별시 용산구 한강로2가'
    },
    동작구: {
      name: 'dongjak',
      place1: '노량진컵밥거리',
      description1: '서울특별시 동작구 노량진로 178',
      place2: '노량진수산시장',
      description2: '서울특별시 동작구 노들로 674',
      place3: '중앙대학교 서울캠퍼스',
      description3: '서울 동작구 흑석로 84'
    },
    관악구: {
      name: 'gwanak',
      place1: '서울대학교',
      description1: '서울특별시 관악구 관악로 1',
      place2: '관악산',
      description2: '서울특별시 관악구 봉천동 산41-1',
      place3: '낙성대공원',
      description3: '서울특별시 관악구 낙성대로 77'
    },
    금천구: {
      name: 'geumcheon',
      place1: '벚꽃십리길',
      description1: '서울특별시 금천구 벚꽃로',
      place2: '금천폭포공원',
      description2: '서울특별시 금천구 시흥대로38길 61',
      place3: '가산디지털단지',
      description3: '서울특별시 금천구 가산디지털1로 99'
    },
    구로구: {
      name: 'guro',
      place1: '고척스카이돔',
      description1: '서울특별시 구로구 경인로 430',
      place2: '항동철길',
      description2: '서울특별시 구로구 오리로 1189',
      place3: '푸른수목원',
      description3: '서울특별시 구로구 서해안로 2117'
    },
    영등포구: {
      name: 'yeongdeungpo',
      place1: '여의도한강공원',
      description1: '서울특별시 영등포구 여의동로 330',
      place2: '63빌딩',
      description2: '서울특별시 영등포구 63로 50',
      place3: '국회의사당',
      description3: '서울특별시 영등포구 여의도동 의사당대로 1'
    },
    마포구: {
      name: 'mapo',
      place1: '망원한강공원',
      description1: '서울특별시 마포구 마포나루길 467',
      place2: '경의선숲길',
      description2: '서울특별시 마포구 연남동',
      place3: '서울월드컵경기장',
      description3: '서울특별시 마포구 성산동 515-39'
    },
    서대문구: {
      name: 'seodaemun',
      place1: '독립문',
      description1: '서울특별시 서대문구 현저동 941',
      place2: '서대문형무소역사관',
      description2: '서울특별시 서대문구 통일로 251',
      place3: '신촌',
      description3: '서울특별시 서대문구 신촌로'
    },
    은평구: {
      name: 'eunpyeong',
      place1: '은평한옥마을',
      description1: '서울특별시 은평구 진관동 193-14',
      place2: '서울기록원',
      description2: '서울특별시 은평구 통일로62길 7',
      place3: '불광천',
      description3: '서울특별시 은평구 응암동'
    },
    강서구: {
      name: 'gangseo',
      place1: '김포공항전망대',
      description1: '서울특별시 강서구 하늘길 170-1',
      place2: '서울식물원',
      description2: '서울특별시 강서구 마곡동로 161',
      place3: '국립항공박물관',
      description3: '서울특별시 강서구 하늘길 177'
    },
    양천구: {
      name: 'yangcheon',
      place1: 'SBS',
      description1: '서울특별시 양천구 목동서로 161',
      place2: '목동종합운동장',
      description2: '서울특별시 양천구 안양천로 939',
      place3: '서서울호수공원',
      description3: '서울특별시 양천구 남부순환로64길 26'
    },
    서초구: {
      name: 'seocho',
      place1: '세빛섬',
      description1: '서울특별시 서초구 올림픽대로 2085-14',
      place2: '반포한강공원',
      description2: '서울특별시 서초구 신반포로11길 40',
      place3: '서울고속버스터미널',
      description3: '서울특별시 서초구 신반포로 194'
    },
    강남구: {
      name: 'gangnam',
      place1: '코엑스아쿠아리움',
      description1: '서울특별시 강남구 영동대로 513',
      place2: '가로수길',
      description2: '서울특별시 강남구 신사동',
      place3: '봉은사',
      description3: '서울특별시 강남구 봉은사로 531'
    },
    송파구: {
      name: 'songpa',
      place1: '롯데월드타워',
      description1: '서울특별시 송파구 올림픽로 300',
      place2: '롯데월드',
      description2: '서울특별시 송파구 올림픽로 240',
      place3: '잠실야구경기장',
      description3: '서울특별시 송파구 올림픽로 19-2'
    },
    강동구: {
      name: 'gangdong',
      place1: '광나루한강공원',
      description1: '서울특별시 강동구 암사동 659-1',
      place2: '광진교',
      description2: '서울특별시 강동구 천호동',
      place3: '서울암사동유적',
      description3: '서울특별시 강동구 올림픽로 875'
    },
    광진구: {
      name: 'gwangjin',
      place1: '뚝섬한강공원',
      description1: '서울특별시 광진구 강변북로 139',
      place2: '서울어린이대공원',
      description2: '서울특별시 광진구 능동로 216',
      place3: '스타시티',
      description3: '서울특별시 광진구 아차산로'
    },
    성동구: {
      name: 'seongdong',
      place1: '서울숲',
      description1: '서울특별시 성동구 뚝섬로 273',
      place2: '왕십리광장',
      description2: '서울특별시 성동구 행당동 192-3',
      place3: '엘리스Lab',
      description3: '서울특별시 성동구 아차산로17길 48'
    },
    동대문구: {
      name: 'dongdaemun',
      place1: '홍릉숲',
      description1: '서울특별시 동대문구 회기로 57',
      place2: '청량리역',
      description2: '서울특별시 동대문구 왕산로 214',
      place3: '스타벅스 경동1960',
      description3: '서울특별시 동대문구 고산자로36길'
    },
    중랑구: {
      name: 'jungnang',
      place1: '서울장미공원',
      description1: '서울특별시 중랑구 묵동 375',
      place2: '용마폭포공원',
      description2: '서울특별시 중랑구 용마산로 250-12',
      place3: '중랑캠핑숲',
      description3: '서울특별시 중랑구 망우로87길 110'
    },
    성북구: {
      name: 'seongbuk',
      place1: '정릉',
      description1: '서울특별시 성북구 아리랑로19길 116',
      place2: '길상사',
      description2: '서울특별시 성북구 선잠로5길 68',
      place3: '고려대학교 서울캠퍼스',
      description3: '서울특별시 성북구 안암로 145'
    },
    강북구: {
      name: 'gangbuk',
      place1: '4.19민주묘지',
      description1: '서울특별시 강북구 수유동 580-1',
      place2: '북한산',
      description2: '서울특별시 강북구 수유동 643-1',
      place3: '화계사',
      description3: '서울특별시 강북구 화계사길 117'
    },
    도봉구: {
      name: 'dobong',
      place1: '우이천',
      description1: '서울특별시 도봉구 쌍문동',
      place2: '둘리뮤지엄',
      description2: '서울특별시 도봉구 시루봉로1길 6',
      place3: '방학동 도깨비시장',
      description3: '서울특별시 도봉구 도당로 85-7'
    },
    노원구: {
      name: 'nowon',
      place1: '경춘선숲길',
      description1: '서울특별시 노원구 공릉동 272-2',
      place2: '태릉강릉',
      description2: '서울특별시 노원구 화랑로 681',
      place3: '서울생활사박물관',
      description3: '서울특별시 노원구 동일로174길 27'
    }
  };
  return (
    <Carousel slide={false} style={{ marginTop: '20px' }}>
      <Carousel.Item interval={6000}>
        <ImageWrapper>
          <StyledImage src={`img/recommend/${category[guName]?.name}00.jpg`} />
          {/* <ExampleCarouselImage text='First slide' /> */}
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{category[guName]?.place1}</h3>
          <p>{category[guName]?.description1}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        {/* <ExampleCarouselImage text='Second slide' /> */}
        <ImageWrapper>
          <StyledImage src={`img/recommend/${category[guName]?.name}01.jpg`} />
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{category[guName]?.place2}</h3>
          <p>{category[guName]?.description2}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text='Third slide' /> */}
        <ImageWrapper>
          <StyledImage src={`img/recommend/${category[guName]?.name}02.jpg`} />
        </ImageWrapper>
        <Carousel.Caption>
          <h3>{category[guName]?.place3}</h3>
          <p>{category[guName]?.description3}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default GuInfoCarousels;
