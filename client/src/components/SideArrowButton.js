import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SideArrowButton({ arrow, title, to }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(to);
  };
  return (
    <StyledDiv>
      <StyledBtn onClick={handleButtonClick}>
        {arrow === 'left' ? (
          <ChevronLeft size={50} title={title} />
        ) : (
          <ChevronRight size={50} title={title} />
        )}
      </StyledBtn>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBtn = styled.button`
  margin: 50px;
  border: 0;
  background-color: transparent;
`;

export default SideArrowButton;
