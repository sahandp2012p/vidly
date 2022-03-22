import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().min(5).label('Password'),
		name: Joi.string().required().label('Name')
	};

	doSubmit = async () => {
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = this.state.errors;
				console.log(errors);
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		const { data: { username: email, password, name }, errors } = this.state;

		return (
			<React.Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', email, 'text', errors)}

					{this.renderInput('password', 'Password', password, 'password', errors)}

					{this.renderInput('name', 'Name', name, 'text', errors)}

					{this.renderButton('Register')}
				</form>
			</React.Fragment>
		);
	}
}

export default RegisterForm;
