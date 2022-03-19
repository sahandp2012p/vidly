import http from './httpService';
import config from '../config/config.json';

const apiEndpoint = config.apiUrl + '/movies';

export function getMovies() {
	return http.get(apiEndpoint);
}

export function getMovie(movieId) {
	return http.get(apiEndpoint + '/' + movieId);
}

export async function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;

		await http.put(apiEndpoint + '/' + movie._id, body);

		return http.put(apiEndpoint + '/' + movie._id, body);
	}

	await http.post(apiEndpoint, movie);

	return http.post(apiEndpoint, movie);
}

export async function deleteMovie(movieId) {
	return http.delete(apiEndpoint + '/' + movieId);
}
