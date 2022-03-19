import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Movie extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' }
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [ { _id: '', name: 'All Genres' }, ...data ];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movie._id);

		this.setState({ movies });

		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error('This movie has already been deleted');
			}

			this.setState(originalMovies);
		}
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	getPagedData() {
		const { pageSize, sortColumn, currentPage, selectedGenre, movies: allMovies, searchQuery } = this.state;

		let filtered = allMovies;

		if (searchQuery)
			filtered = allMovies.filter((m) => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [ sortColumn.path ], [ sortColumn.order ]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	}

	render() {
		const { pageSize, sortColumn, currentPage, searchQuery } = this.state;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className="col">
					<Link to="/movies/new" className="btn btn-primary btn-sm mb-4">
						New Movie
					</Link>

					{totalCount > 0 ? (
						<p>{`Showing ${totalCount} movies in the database`}</p>
					) : (
						'There are no movies in the database'
					)}

					<SearchBox value={searchQuery} onChange={this.handleSearch} />

					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>

					<Pagination
						itemsCount={totalCount}
						currentPage={currentPage}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movie;
