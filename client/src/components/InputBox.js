function InputBox({ name, value, ...rest }) {
  return (
    <input
      className="input-box"
      id={name}
      name={name}
      value={value}
      {...rest}
    />
  );
}

export default InputBox;
