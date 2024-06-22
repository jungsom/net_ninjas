import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column; /* 자식 요소들을 수직으로 나열 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem; /* 내용 크기 조정 */
  color: #666; /* 내용 색상 변경 */
  margin-bottom: 2rem; /* 아래 여백 추가 */
`;

export default function Content() {
  return (
    <StyledDiv>
      <Title>MZ 여러분, 서울에 오신 것을 환영합니다!</Title>
      <Description>
        동네잇유가 여러분의 서울 정착을 도와드립니다. 서울에서 나에게 딱 맞는
        지역은 어디인지 탐색해보세요.
      </Description>
      <Button variant='primary' href='/recommend'>
        나에게 맞는 서울 지역 찾기
      </Button>
    </StyledDiv>
  );
}
