'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import axios from 'axios';

export const chats=createAsyncThunk(
    'chats',
     async (userInput, { rejectWithValue }) => {
        try {
            // const response = await axios.post('https://arsalaanrasulcap.bestworks.cloud/chat/agent', userInput);
            const response = await axios.post('https://capmcp.bestworks.cloud/chat/agent', userInput);
            console.log("response",response);
            
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
const initialState={
    loading:false,
    error:false,
    chatsData:{}
}
const chatSlice=createSlice({
    name:'cht',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(chats.pending,(state)=>{
        state.loading=true
        })
        .addCase(chats.fulfilled,(state,{payload})=>{
            state.loading=false
            state.chatsData=payload
        })
        .addCase(chats.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }

})
export default chatSlice.reducer;