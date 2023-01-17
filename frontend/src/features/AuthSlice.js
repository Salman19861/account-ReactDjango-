import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
}

export const authReducer = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken
    },
    unSetAccessToken: (state, action) => {
        state.accessToken = action.payload.accessToken
      },
  },
})

// Action creators are generated for each case reducer function
export const { setAccessToken,unSetAccessToken } = authReducer.actions
export default authReducer.reducer