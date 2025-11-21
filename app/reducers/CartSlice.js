import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const addCart=createAsyncThunk(
    'addCart',
     async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/cart/add-cart`,userInput);
            console.log("response",response);
            
            if (response?.data?.status_code === 201) {
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



export const uploadLogo=createAsyncThunk(
    'uploadLogo',
     async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/logo/upload-logo`,userInput);
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
    cartData:[],
    uploadLogoData:""
}

const CartSlice=createSlice(
    {
        name:"cart",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(addCart.pending,(state)=>{
                state.loading=true
            })
            .addCase(addCart.fulfilled,(state,{payload})=>{
                state.loading=false
                state.cartData=payload
                state.error=false
            })
            .addCase(addCart.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(uploadLogo.pending,(state)=>{
                state.loading=true
            })
            .addCase(uploadLogo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.uploadLogoData=payload
                state.error=false
            })
            .addCase(uploadLogo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default CartSlice.reducer;