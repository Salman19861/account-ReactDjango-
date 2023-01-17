import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',email:''
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
    unSetUserInfo: (state, action) => {
        state.name=action.payload.name
        state.email=action.payload.email
      },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,unSetUserInfo } = userSlice.actions
export default userSlice.reducer