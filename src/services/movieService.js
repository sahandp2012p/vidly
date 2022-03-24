import http from './httpService';

const apiEndpoint = '/movies';

export function getMovies() {
	return http.get(apiEndpoint);
}

export function getMovie(movieId) {
	return http.get(apiEndpoint + '/' + movieId);
}

export function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;

		return http.put(apiEndpoint + '/' + movie._id, body);
	}

	const body = { ...movie };
	delete body._id;

	return http.post(apiEndpoint, body);
}

export async function deleteMovie(movieId) {
	return http.delete(apiEndpoint + '/' + movieId);
}
