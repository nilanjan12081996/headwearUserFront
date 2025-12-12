import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const addArtWork = createAsyncThunk(
    'addArtWork',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`postgresapi/user/artWork/add`, userInput);
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

export const addOnPrice = createAsyncThunk(
    'addOnPrice',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`postgresapi/user/artWork/addon-prices`);
            console.log("response", response);

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


export const setUpPlanList = createAsyncThunk(
    'setUpPlanList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`postgresapi/user/artWork/setup-plan-list`);
            console.log("response", response);

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




const initialState = {
    loading: false,
    error: false,
    addArtWorkData:"",
    adonPriceData:[],
    setUpPlanListData:[]

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
            .addCase(addArtWork.fulfilled,(state,{payload})=>{
                state.loading=false
                state.addArtWorkData=payload
                state.error=false
            })
            .addCase(addArtWork.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
                .addCase(addOnPrice.pending,(state)=>{
                state.loading=true
            })
            .addCase(addOnPrice.fulfilled,(state,{payload})=>{
                state.loading=false
                state.adonPriceData=payload
                state.error=false
            })
            .addCase(addOnPrice.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
                  .addCase(setUpPlanList.pending,(state)=>{
                state.loading=true
            })
            .addCase(setUpPlanList.fulfilled,(state,{payload})=>{
                state.loading=false
                state.setUpPlanListData=payload
                state.error=false
            })
            .addCase(setUpPlanList.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default ArtWorkSlice.reducer;