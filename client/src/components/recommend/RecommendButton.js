import styled from 'styled-components';

function RecommendButton({ name, ...rest }) {
  return (
    <Button title={name} {...rest}>
      {name}
    </Button>
  );
}

const Button = styled.button`
  background-color: #5fc3c8;
  width: 200px;
  height: 60px;
  border: none;
  border-radius: 7px;
  font-size: 23px;
  font-weight: bold;
  color: white;
`;

export default RecommendButton;
