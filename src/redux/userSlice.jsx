import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstname: 'Paul'
    },
    reducers: {

    }
})


// Action creator
export const {} = userSlice.actions

export default userSlice.reducer

