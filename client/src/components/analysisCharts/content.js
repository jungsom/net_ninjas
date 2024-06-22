import { BarChart } from '@mui/x-charts/BarChart';
import { useContext } from 'react'; // useContext, TotalContext, useNavigate 공통으로 선언
import TotalStatisticsContext from '../totalStatistics/TotalStatisticsContext';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 2%;
  h3 {
    font-weight: bold;
  }
  h4 {
    width: 100%;
    // margin-left: 50px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;

const StyledImage = styled.img`
  width: 11%;
  height: auto;
  margin-right: 80px;
  object-fit: contain;
`;

const ImageWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
`;

const ButtonWrapper = styled.div`
  //   width: 100%;
  //   margin-left: 60px;
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  all: unset;
  font-weight: bold;
  font-size: 1.2em;
`;

export default function Content({ boldText, text1, img, text2, data }) {
  const { setKeyword, setPage, setSort, setSortColumn } = useContext(
    TotalStatisticsContext
  ); // 이 부분 다른 항목에도 붙여넣기
  const navigate = useNavigate(); // 여기도

  function MoveToTable(guName) {
    // 이동하는 함수, 버튼 onClick에 붙일 것
    setKeyword(guName);
    setPage(1);
    setSort('');
    setSortColumn('');
    navigate('/totalStatistics');
  }

  return (
    <ContentWrapper>
      <ImageWrapper>
        <StyledImage src={img} />
        <div style={{ width: '100%' }}>
          <h4>{boldText}</h4>
          <p>
            <b>{boldText}</b>
            {text1}
          </p>
          <p>{text2}</p>
          <ButtonWrapper onClick={() => MoveToTable(data[0].gu)}>
            <StyledButton>{data[0].gu} 더 알아보러 가기</StyledButton>
            <img
              src='img/arrow.png'
              style={{
                marginLeft: '20px',
                marginBottom: '0px',
                height: '30px'
              }}
            />
          </ButtonWrapper>
        </div>
      </ImageWrapper>
    </ContentWrapper>
  );
}
