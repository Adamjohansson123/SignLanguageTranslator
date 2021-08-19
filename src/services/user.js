const BASE_API_URL = 'http://localhost:5000/'

export const getAllUsers = () => {
	return fetch(`${BASE_API_URL}user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getUserByName = (name) => {
	return fetch(`${BASE_API_URL}user?name=${name}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}