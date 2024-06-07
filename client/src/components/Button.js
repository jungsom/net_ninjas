function Button({ label, ...rest }) {
  return (
    <button title={label} className="button" {...rest}>
      {label}
    </button>
  );
}

export default Button;
