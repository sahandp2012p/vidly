import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from './components/customers';
import Movies from './components/movies';
import Navbar from './components/navbar';
import Rentals from './components/rentals';
import Notfound from './components/notfound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import auth from './services/authService';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;

		return (
			<React.Fragment>
				<Navbar user={user} />
				<main className="container my-5">
					<ToastContainer />
					<Switch>
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route path="/logout/" component={Logout} />
						<Route path="/register/" component={RegisterForm} />
						<Route path="/login/" component={LoginForm} />
						<Route path="/movies" render={(props) => <Movies {...props} user={this.state.user} />} />
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={Notfound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
