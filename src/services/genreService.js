import config from '../config/config.json';

export function getGenres() {
	return http.get('/genres');
}
