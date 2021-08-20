const BASE_API_URL = 'https://secret-sands-22629.herokuapp.com/'

/**
 * File containing basic https requests for users with their respsective URLs
 */

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

export const addUser = (user) => {
	return fetch(`${BASE_API_URL}user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user)
	})
}