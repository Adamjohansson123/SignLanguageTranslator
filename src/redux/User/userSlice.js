import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    activeUser: null,
  },
  reducers: {
    userToState: (state, action) => {
      state.activeUser = action.payload;
    }
  }
  })

  export const { userToState } = userSlice.actions;

  export default userSlice.reducer;  