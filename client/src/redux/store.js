import { configureStore } from '@reduxjs/toolkit'
import authReducer from "redux/slice/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})