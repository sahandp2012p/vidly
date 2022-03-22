import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await auth.login(data.username, data.password);

			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />

		const { data: { username, password }, errors } = this.state;

		return (
			<React.Fragment>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', username, 'text', errors)}

					{this.renderInput('password', 'Password', password, 'password', errors)}

					{this.renderButton('Login')}
				</form>
			</React.Fragment>
		);
	}
}

export default LoginForm;
