import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
	state = { data: {}, errors: {} };

	validate = () => {
		const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });

		if (!error) return null;

		const errors = {};

		error.details.forEach((item) => (errors[item.path[0]] = item.message));

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const { error } = Joi.validate(obj, { [name]: this.schema[name] });

		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });

		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const error = this.validateProperty(input);
		if (error) errors[input.name] = error;
		else delete errors[input.name];

		const data = { ...this.state.data };

		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary" type="submit">
				{label}
			</button>
		);
	}

	renderInput(name, label, value, type, errors) {
		return (
			<Input
				name={name}
				label={label}
				value={value}
				type={type}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;

		return (
			<Select
				name={name}
				value={data[name]}
				label={label}
				options={options}
				onChange={this.handleChange}
				error={errors.name}
			/>
		);
	}
}

export default Form;
