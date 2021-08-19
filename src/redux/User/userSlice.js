import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers, getUserByName } from '../../services/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    activeUser: null,
    users: [],
    userByNameResult: null,
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
      state.users = action.payload
      state.loading = false
      state.error = ''

    },
    getAllUsersFailed: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    getUserByNameStarted: (state) => {
      state.loading = true
    },
    getUserByNameSuccess: (state, action) => {
      state.userByNameResult = action.payload
      state.loading = false
      state.error = ''
    },
    getUserByNameFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})

export const {
  userToState,
  getAllUsersFailed,
  getAllUsersStarted,
  getAllUsersSuccess,
  getUserByNameStarted,
  getUserByNameSuccess,
  getUserByNameFailed
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

export const fetchUserByName = (name) => async dispatch => {
  dispatch(getUserByNameStarted())
  try {
    const response = await getUserByName(name)
    const data = await response.json()

    dispatch(getUserByNameSuccess(data))
  }
  catch(err) {
    dispatch(getUserByNameFailed(err.toString()))
  }
}


export default userSlice.reducer;