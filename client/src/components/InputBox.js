import styled from 'styled-components';

// 매개변수:  name, value값
function InputBox({ name, value, ...rest }) {
  return <StyledInputBox id={name} name={name} value={value} {...rest} />;
}

const StyledInputBox = styled.input`
  font-size: 13px;
  width: 280px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #dae2ed;
`;

export default InputBox;
