import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const addAddress = createAsyncThunk(
    'addAddress',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`postgresapi/user/address/add`, userInput);
            console.log("response", response);

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




const initialState = {
    loading: false,
    error: false,
    addAddressData:""

}

const CheckoutSlice = createSlice(
    {
        name: "check",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(addAddress.pending,(state)=>{
                state.loading=true
            })
            .addCase(addAddress.fulfilled,(state,{paylaod})=>{
                state.loading=false
                state.addAddressData=paylaod
                state.error=false
            })
            .addCase(addAddress.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default CheckoutSlice.reducer;