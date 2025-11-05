import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';



export const getSuppliers=createAsyncThunk(
    'getSuppliers',
     async ({limit,page}, { rejectWithValue }) => {
        try {
            const response = await api.get(`user/supplier/list?limit=${limit}&page=${page}`);
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
    suppliersList:[]
}
const SupplierSlice=createSlice(
    {
        name:"suppliers",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getSuppliers.pending,(state)=>{
                state.loading=true
            })
            .addCase(getSuppliers.fulfilled,(state,{payload})=>{
                state.loading=false
                state.suppliersList=payload
                state.error=false
            })
            .addCase(getSuppliers.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default SupplierSlice.reducer;