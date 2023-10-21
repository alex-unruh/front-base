
import { api } from "src/boot/axios";

export default function useUsers() {

	const token = window.sessionStorage.getItem('token');
	api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

	function list() {
		return api.get('users');
	}

	function show(id) {
		return api.get('users/' + id + '/show')
	}

	function store(userData) {
		return api.post('users/store', userData)
	}

	function update(userData, id) {
		return api.post('users/' + id + '/update', userData)
	}

	function destroy(userData) {
		return api.post('users/' + userData.id + '/delete');
	}

	return { list, show, store, update, destroy }
}
