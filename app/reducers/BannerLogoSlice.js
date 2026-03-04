import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newApi from "./newApi";

// GET /api/banners/view
export const getBannerList = createAsyncThunk(
    'bannerLogo/getBannerList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get('/api/banners/view');
            if (response?.data?.status === true || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Something went wrong.');
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

// GET /api/logo-placement/all-placement-list
export const getLogoPlacementList = createAsyncThunk(
    'bannerLogo/getLogoPlacementList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get('/api/logo-placement/all-placement-list');
            if (response?.data?.status === true || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Something went wrong.');
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const initialState = {
    bannerListLoading: false,
    bannerListError: null,
    bannerList: [],

    logoPlacementListLoading: false,
    logoPlacementListError: null,
    logoPlacementList: [],
}

const BannerLogoSlice = createSlice({
    name: 'bannerLogo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Banner List
            .addCase(getBannerList.pending, (state) => {
                state.bannerListLoading = true;
                state.bannerListError = null;
            })
            .addCase(getBannerList.fulfilled, (state, { payload }) => {
                state.bannerListLoading = false;
                state.bannerList = payload?.data || payload;
                state.bannerListError = null;
            })
            .addCase(getBannerList.rejected, (state, { payload }) => {
                state.bannerListLoading = false;
                state.bannerListError = payload?.message || 'Failed to fetch banner list.';
            })

            // Get Logo Placement List
            .addCase(getLogoPlacementList.pending, (state) => {
                state.logoPlacementListLoading = true;
                state.logoPlacementListError = null;
            })
            .addCase(getLogoPlacementList.fulfilled, (state, { payload }) => {
                state.logoPlacementListLoading = false;
                state.logoPlacementList = payload?.data || payload;
                state.logoPlacementListError = null;
            })
            .addCase(getLogoPlacementList.rejected, (state, { payload }) => {
                state.logoPlacementListLoading = false;
                state.logoPlacementListError = payload?.message || 'Failed to fetch logo placement list.';
            })
    }
})

export default BannerLogoSlice.reducer;