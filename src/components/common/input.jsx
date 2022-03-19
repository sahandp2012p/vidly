import React from 'react';

const Input = ({ name, label, value, onChange, type, error }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input value={value} id={name} type={type} className="form-control" name={name} onChange={onChange} />
			{error && <div className="my-2 alert alert-danger">{error}</div>}{' '}
		</div>
	);
};

export default Input;
