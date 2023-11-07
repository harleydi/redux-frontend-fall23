import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../lib/Axios'
import { authSuccess } from './authSlice'

// thunk middleware is for async
// createAsyncThunk, first parameter is your action.type (create is with the name + / + name of function)
// nest param is the function, it takes in the payload data from the dispatch
export const loginTest = createAsyncThunk('user/loginTest', async () => {
    // call the backend / API
    let response = await Axios.get('/users/login-test')

    // return sets the action.payload for the extraReducers
    // return {
        // payload: response.data
    // }
    // essentially this breaks down to
    // dispatch({
    //     type: 'user/loginTest',
    //     payload: response.data
    // })

    return response.data
})

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        let response = await Axios.post('/users/register', userData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        delete Axios.defaults.headers.common['Authorization']

        let response = await Axios.post('/users/login', userData)
        

        //save token to local storage if isRemember is checked
        // userData.isRemember && localStorage.setItem('reduxToken', response.data.token)
        localStorage.setItem('reduxToken', response.data.token)

        // dispatch auth success to authSlice
        thunkAPI.dispatch(authSuccess())

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        message: '',
        status: null
    },
    //syncronous set state
    reducers: {
        setUser: (state, action) => {
            state.firstname = action.payload.firstname,
            state.lastname = action.payload.lastname,
            state.email = action.payload.email,
            state.message = action.payload.message
        },
        resetStatus: state => {
            // return {
            //     ...state,
            //     status: null
            // }
            //Immer library in effect does the above, 
            // in other words it preserves the previous state and updates only the one(s) specified 
            state.status = null
        },
        setMessage: (state, action) => {
            
            state.message = action.payload
        },
        resetUser: state => {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                message: '',
                status: null
            }
        }


    },
    // asyncronous set state
    extraReducers: builder => {
        // for each dispatch use builder.addCase, 
        // takes in the function name and the promise state ->  funcName.promiseState
        // then it takes the state and action like a reducer
        builder.addCase(loginTest.fulfilled, (state, action) => {
            // cannot do a whole state replacement
            // state = action.payload
            // instead either use a return
            return {
                ...action.payload
            }

            // or modify state directly
            // state.firstname = action.payload.firstname
            // state.lastname = action.payload.lastname
            // state.email = action.payload.email
        })
        builder.addCase(register.rejected, (state, action) => {
            console.log('!@-------rejected Registration-------@!')
            console.log(action.payload);
            state.status = 'rejected'
            state.message = action.payload
            
        })
        builder.addCase(register.pending, (state, action) => {
            console.log('!@-------pending Registration-------@!')
            state.status = 'pending'
        })
        builder.addCase(register.fulfilled, (state, action) => {
            return { 
                ...action.payload,
                status: 'fulfilled'
            }
        })
        builder.addCase(login.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'rejected'
            state.message = action.payload
        })
        builder.addCase(login.fulfilled, (state, action) => {
            // for backend returning userObj
            // state.firstname = action.payload.userObj.firstname
            // state.lastname = action.payload.userObj.lastname
            // state.email = action.payload.userObj.email
            // state.status = 'fulfilled'
            // state.message = action.payload.message

            // for backend without userObj
            // return { 
            //     ...action.payload,
            //     status: 'fulfilled'
            // }

            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.email = action.payload.email
            state.status = 'fulfilled'
            state.message = action.payload.message
        })
    }
})

//action creator is only for reducers NOT extraReducers
export const { setUser, resetStatus, setMessage } = userSlice.actions

export default userSlice.reducer