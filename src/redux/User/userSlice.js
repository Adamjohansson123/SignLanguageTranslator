import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../../services/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    activeUser: null,
    users: [],
    loading: false,
    error: ''
  },
  reducers: {
    userToState: (state, action) => {
      state.activeUser = action.payload;
    },
    getAllUsersStarted: (state) => {
      state.loading = true
    },
    getAllUsersSuccess: (state, action) => {
      console.log(action.payload);
      state.users = action.payload
      state.loading = false
      state.error = ''

    },
    getAllUsersFailed: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const {
  userToState,
  getAllUsersFailed,
  getAllUsersStarted,
  getAllUsersSuccess 
} = userSlice.actions;

export const fetchAllUsers = () => async dispatch => {
  dispatch(getAllUsersStarted())
  try {
    const response = await getAllUsers()
    const data = await response.json()

    dispatch(getAllUsersSuccess(data))
  }
  catch (err) {
    dispatch(getAllUsersFailed(err.toString()))
  }
}


export default userSlice.reducer;