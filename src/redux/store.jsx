import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'

// auth ex. auth reducer, authSlice, state = isAuth

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    }
})