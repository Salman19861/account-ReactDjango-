import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthAPI } from '../services/UserAuthAPI'
import authReducer from '../features/AuthSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    auth:authReducer,
    userInfo:userReducer,
},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPI.middleware),
})
setupListeners(store.dispatch)