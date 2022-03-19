import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class RegisterForm extends Form {
	state = {
		account: { email: '', password: '', name: '' },
		errors: {}
	};

	schema = {
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().min(5).label('Password'),
		name: Joi.string().required().label('Name')
	};

	doSubmit = () => {
		// Call the server
		console.log('Submited');
	};

	render() {
		const { account: { email, password, name }, errors } = this.state;

		return (
			<React.Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email', email, 'email', errors)}

					{this.renderInput('password', 'Password', password, 'password', errors)}

					{this.renderInput('name', 'Name', name, 'text', errors)}

					{this.renderButton('Register')}
				</form>
			</React.Fragment>
		);
	}
}

export default RegisterForm;
