const BASE_API_URL = 'http://localhost:5000/'

export const getAllUsers = () => {
	return fetch(`${BASE_API_URL}user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}