import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
	state = {
		account: { username: '', password: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	};

	doSubmit = () => {
		// Call the server
		console.log('Submited');
	};

	render() {
		const { account: { username, password }, errors } = this.state;

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
