import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';



export const getProduct=createAsyncThunk(
    'getProduct',
     async ({id}, { rejectWithValue }) => {
        try {
            let url=`user/hats/list?id=${id}`
            const response= await api.get(url);
            
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



export const getAllProduct=createAsyncThunk(
    'getAllProduct',
     async ({page,limit}, { rejectWithValue }) => {
        try {
            const response= await api.get(`user/hats/full/list?page=${page}&limit=${limit}`);
            
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


export const getSingleProduct=createAsyncThunk(
    'getSingleProduct',
     async ({id}, { rejectWithValue }) => {
        try {
            let url=`user/hats/single?id=${id}`
            const response= await api.get(url);
            
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
    productList:[],
    allProList:[],
    singleProList:[]
}
const ProductSlice=createSlice(
    {
        name:"prod",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getProduct.pending,(state)=>{
                state.loading=true
            })
            .addCase(getProduct.fulfilled,(state,{payload})=>{
                state.loading=false
                state.productList=payload
                state.error=false
            })
            .addCase(getProduct.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
              .addCase(getAllProduct.pending,(state)=>{
                state.loading=true
            })
            .addCase(getAllProduct.fulfilled,(state,{payload})=>{
                state.loading=false
                state.allProList=payload
                state.error=false
            })
            .addCase(getAllProduct.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })

                  .addCase(getSingleProduct.pending,(state)=>{
                state.loading=true
            })
            .addCase(getSingleProduct.fulfilled,(state,{payload})=>{
                state.loading=false
                state.singleProList=payload
                state.error=false
            })
            .addCase(getSingleProduct.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default  ProductSlice.reducer;