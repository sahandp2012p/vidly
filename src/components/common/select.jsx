import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>

			<select name={name} id={name} {...rest} className="form-control">
				<option value="" disabled selected />
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="my-2 alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
