import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";


export const getHatBrandList = createAsyncThunk(
    "hatBrand/getHatBrandList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("user/hats/brand-list");

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || "Something went wrong."
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const getHatListDetail = createAsyncThunk(
    "hatBrand/getHatListDetail",
    async ({ brandId }, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `user/hats/hatlist-detail?brandId=${brandId}`
            );

            if (response?.data?.status_code === 200) {
                return {
                    brandId,         
                    data: response.data
                };
            } else {
                return rejectWithValue(
                    response?.data?.errors || "Something went wrong."
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    brandList: [],
    brandWiseHatList: {},  
};

const hatBrandSlice = createSlice({
    name: "hatBrand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHatBrandList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHatBrandList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.brandList = payload;
                state.error = null;
            })
            .addCase(getHatBrandList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            .addCase(getHatListDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHatListDetail.fulfilled, (state, { payload }) => {
                state.loading = false;

                const { brandId, data } = payload;
                state.brandWiseHatList = {
                    ...state.brandWiseHatList,
                    [brandId]: data,
                };

                state.error = null;
            })
            .addCase(getHatListDetail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default hatBrandSlice.reducer;
