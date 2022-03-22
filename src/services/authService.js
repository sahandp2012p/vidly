import http from './httpService';
import config from '../config/config.json';
import decodeJwt from 'jwt-decode';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });
	localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return decodeJwt(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default { login, logout, getCurrentUser, loginWithJwt, getJwt };
