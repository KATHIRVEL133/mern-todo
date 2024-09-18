/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart : (state)=>
        {
            state.loading = true;
        },
        signInSuccess:(state,action)=>
        {
        state.currentUser = action.payload;
        state.error = null;
        state.loading = false;
        },
        signInFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart : (state)=>
        {
            state.loading = true;
        },
        updateSuccess:(state,action)=>
        {
        state.currentUser = action.payload;
        state.error = null;
        state.loading = false;
        },
        updateFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
        signOutStart : (state)=>
        {
            state.loading = true;
        },
        signOutSuccess:(state,action)=>
        {
        state.currentUser = action.payload;
        state.error = null;
        state.loading = false;
        },
        singOutFailure:(state,action)=>
        {
            state.loading = false;
            state.error = action.payload;
        },
         
    }
})
export const {signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,signOutStart,signOutSuccess,singOutFailure} = userSlice.actions;
export default userSlice.reducer;