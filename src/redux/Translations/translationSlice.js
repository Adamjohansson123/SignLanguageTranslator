import { createSlice } from '@reduxjs/toolkit'
import { getTranslationsByUserId, updateTranslationById, getAllTranslations, addTranslation } from '../../services/translations';

export const translationSlice = createSlice({
  name: 'translation',
  initialState: {
    translations: [],
	allTranslations: [],
    loading: false,
    error: ''
  },
  reducers: {
		getTranslationsStarted: (state) => {
			state.loading = true
		},
		getTranslationsSuccess: (state, action) => {
			state.translations = action.payload
			state.loading = false
			state.error = ''
		},
		getTranslationsFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		getAllTranslationsStarted: (state) => {
			state.loading = true
		},
		getAllTranslationsSuccess: (state, action) => {
			state.allTranslations = action.payload
			state.loading = false
			state.error = ''
		},
		getAllTranslationsFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		updateTranslationsStarted: (state) => {
			state.loading = true
		},
		updateTranslationsSuccess: (state, action) => {
		
			const index = state.translations.findIndex(e => e.id === action.payload.id)
			state.translations[index].status = action.payload.status
		
			state.loading = false
			state.error = ''
		},
		updateTranslationsFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		addNewTranslationStarted: (state) => {
			state.loading = true
		},
		addNewTranslationSuccess: (state, action) => {
			
			state.loading = false
			state.error = ''
		},
		addNewTranslationFailed: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
  }
  })

  export const { 
		getTranslationsStarted, 
		getTranslationsSuccess, 
		getTranslationsFailed, 
		getAllTranslationsStarted,
		getAllTranslationsSuccess,
		getAllTranslationsFailed,
		updateTranslationsStarted,
		updateTranslationsSuccess,
		updateTranslationsFailed,
		addNewTranslationStarted,
		addNewTranslationSuccess,
		addNewTranslationFailed
	} = translationSlice.actions;

 
	export const fetchTranslationById = (userId) => async dispatch => { 
		dispatch(getTranslationsStarted())  
		try {    
			const response = await getTranslationsByUserId(userId)   
			const data = await response.json()
			dispatch(getTranslationsSuccess(data))  
		} 
		catch (err) {    
			dispatch(getTranslationsFailed(err.toString()))  
		}
	} 

	export const fetchAllTranslations = (userId) => async dispatch => {
		dispatch(getAllTranslationsStarted())
		try {
			const response = await getAllTranslations(userId)
			const data = await response.json()

			dispatch(getAllTranslationsSuccess(data))
		}
		catch(err) {
			dispatch(getAllTranslationsFailed(err.toString()))
		}
	}

	export const updateTranslation = (translation) => async dispatch => {
		dispatch(updateTranslationsStarted())
		try {
			const response = await updateTranslationById(translation)
			const updatedData = await response.json()

			dispatch(updateTranslationsSuccess(updatedData))
		}
		catch(err) {
			dispatch(updateTranslationsFailed(err.toString()))
		}
	}

	export const addNewTranslation = (translation) => async dispatch => {
		dispatch(addNewTranslationStarted())
		try {
			await addTranslation(translation)

			dispatch(addNewTranslationSuccess())
		}
		catch(err) {
			dispatch(addNewTranslationFailed(err.toString()))
		}
	}
	


  export default translationSlice.reducer;  