import React from 'react';
import { getMovie, saveMovie } from '../services/movieService';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from './../services/genreService';

class MovieForm extends Form {
	doSubmit = async () => {
		await saveMovie(this.mapToViewModel(this.state.data));

		this.props.history.push('/movies/');
	};

	state = {
		data: { _id: '', title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
		genres: [],
		errors: {}
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genre: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().min(0).max(100).label('Number In Stock'),
		dailyRentalRate: Joi.number().min(0).max(10).label('Daily Rental Rate')
	};

	async componentDidMount() {
		const { data: genres } = await getGenres();
		this.setState({ genres });

		if (this.props.match.params.id === 'new') return;

		try {
			const { data: movie } = await getMovie(this.props.match.params.id);

			this.setState({
				data: {
					_id: movie._id,
					title: movie.title,
					genreId: movie.genreId,
					numberInStock: movie.numberInStock,
					dailyRentalRate: movie.dailyRentalRate
				}
			});
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found');
		}
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	render() {
		const { data: { title, numberInStock, dailyRentalRate }, genres, errors } = this.state;

		return (
			<form onSubmit={this.doSubmit}>
				{this.renderInput('title', 'Title', title, 'text', errors)}
				{this.renderSelect('genre', 'Genre', genres)}
				{this.renderInput('numberInStock', 'Number In Stock', numberInStock, 'number', errors)}
				{this.renderInput('dailyRentalRate', 'Daily Rental Rate', dailyRentalRate, 'text', errors)}
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</form>
		);
	}
}

export default MovieForm;
