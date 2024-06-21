import TotalTable from './total/TotalTable';
import TotalSearch from './total/TotalSearch';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Total() {
  const navigate = useNavigate();
  // 접속한 기기가 모바일인지 확인하는 함수, true면 모바일로 접속
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  useEffect(() => {
    if (isMobile()) {
      navigate('/total/mobile');
    }
  }, []);

  return (
    <StyledContent>
      <TotalSearch />
      <TotalTable />
    </StyledContent>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Total;
