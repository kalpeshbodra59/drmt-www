const Label = ({ htmlFor, className='', text }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  );
};

export default Label;
