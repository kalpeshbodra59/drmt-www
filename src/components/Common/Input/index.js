const Input = ({
  id,
  name,
  type = "text",
  autoComplete = false,
  required = false,
  className,
  placeholder,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default Input;
