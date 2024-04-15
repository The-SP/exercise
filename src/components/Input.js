const Input = ({ label, id, value, onChange, type, error, ...props }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label" htmlFor={id}>{label}:</label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;