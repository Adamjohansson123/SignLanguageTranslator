import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers, getUserByName, addUser } from '../../services/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    activeUser: null,             // Currently active user
    users: [],                    // All users from DB to better filter out a user
    newUser: null,                // State for recieving the returned object after creating a new user
    userByNameResult: null,       // State for recieving result of querying a user by name
    loading: false,               // Status indicator for http requests
    error: ''                     // Error state for http requests
  },
  reducers: {
    	/**
		 * Reducers where each thunk has it's own three status setters, with pattern -
		 * (reducer name) started/success/failed for keeping better track of requests
		 */
    userToState: (state, action) => { // Not a http request
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
    addNewUserStarted: (state) => {
      state.loading = true
    },
    addNewUserSuccess: (state, action) => {
      state.newUser = action.payload
      state.error = ''
      state.loading = false
    },
    addNewUserFailed: (state, action) => {
      state.error = action.payload
      state.loading = false
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
  getUserByNameFailed,
  addNewUserStarted,
  addNewUserSuccess,
  addNewUserFailed
} = userSlice.actions;

/**
 * Thunk for getting all users
 */
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

/**
 * Thunk for getting a single user by it's name
 */
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

/**
 * Thunk for adding a single new user, takes just a name for input. Acts only as http request and
 * sets no state in return.
 */
export const addNewUser = (name) => async dispatch => {
  dispatch(addNewUserStarted())
  try {
    const response = await addUser(name)
    const data = await response.json()

    dispatch(addNewUserSuccess(data))
  }
  catch(err) {
    dispatch(addNewUserFailed(err.toString()))
  }
}


export default userSlice.reducer;