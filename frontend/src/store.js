import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import authSlice from './slices/authSlice'
import languageReducer from './slices/lanuageSlice'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})
