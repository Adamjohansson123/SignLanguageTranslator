import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/userSlice'
import translationsReducer from './Translations/translationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    translations: translationsReducer
  }
})

export default store