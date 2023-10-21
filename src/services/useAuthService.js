import { api } from 'src/boot/axios'

export default function useAuth() {

	/**
	 * Login users
	 *
	 * @param {string} user
	 * @param {string} pass
	 * @returns {Promise}
	 */
	function login(user, pass) {
		return api.post('login', {}, {
			auth: {
				username: user,
				password: pass
			}
		})
	}

	/**
	 * Logout Users
	 *
	 * @returns {Promise}
	 */
	function logout() {
		const token = window.sessionStorage.getItem('token');
		api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		return api.get('full-logout');
	}

	/**
	 * Refresh an authentication token
	 * @returns {Promise}
	 */
	function refreshToken() {
		const token = window.sessionStorage.getItem('token');
		api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		return api.get('refresh-token');
	}

	return { login, logout, refreshToken }

}
