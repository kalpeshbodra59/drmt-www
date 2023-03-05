const Button = ({ className, text, disabled=false, type = 'button', onClick = () => {} }) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
