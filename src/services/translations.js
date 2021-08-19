
const BASE_API_URL = 'http://localhost:5000/'

export const getTranslationsByUserId = async (userId) => {
	return await fetch(`${BASE_API_URL}translation?_sort=id&_order=desc&_limit=10&status=active&FK_userId=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getAllTranslations = async (userId) => {
	return await fetch(`${BASE_API_URL}translation?status=active&FK_userId=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const updateTranslationById = async (translation) => {
	return await fetch(`${BASE_API_URL}translation/${translation.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(translation),
	})
}

export const addTranslation = async (translation) => {
	await fetch(`${BASE_API_URL}translation`, {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(translation),
	})
}
