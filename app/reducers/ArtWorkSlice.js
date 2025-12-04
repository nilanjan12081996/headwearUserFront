import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const addArtWork = createAsyncThunk(
    'addArtWork',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/artWork/add`, userInput);
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
    addArtWorkData:""

}

const ArtWorkSlice = createSlice(
    {
        name: "art",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(addArtWork.pending,(state)=>{
                state.loading=true
            })
            .addCase(addArtWork.fulfilled,(state,{paylaod})=>{
                state.loading=false
                state.addArtWorkData=paylaod
                state.error=false
            })
            .addCase(addArtWork.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default ArtWorkSlice.reducer;