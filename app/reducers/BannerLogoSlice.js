import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newApi from "./newApi";

export const getBannerList = createAsyncThunk(
    'bannerLogo/getBannerList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get('/api/banners/view');
            console.log('getBannerList raw response:', response.data);
            if (response?.data?.status === true || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Something went wrong.');
            }
        } catch (err) {
            console.log('getBannerList error:', err); // ← error হলে দেখাবে
            return rejectWithValue(err?.response?.data || err.message);
        }
    }
);

// GET /api/logo-placement/all
export const getLogoPlacementList = createAsyncThunk(
    'bannerLogo/getLogoPlacementList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get('/api/logo-placement/all');
            console.log('getLogoPlacementList raw response:', response.data);
            if (response?.data?.status === true || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Something went wrong.');
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || err.message || 'Request failed');
        }
    }
);

const initialState = {
    // Banner
    bannerListLoading: false,
    bannerListError: null,
    bannerList: [],

    // Logo Placement
    logoPlacementListLoading: false,
    logoPlacementListError: null,
    logoPlacementList: [],
};

const BannerLogoSlice = createSlice({
    name: 'bannerLogo',
    initialState,
    reducers: {
        // Reset logo placement list
        resetLogoPlacementList: (state) => {
            state.logoPlacementList = [];
            state.logoPlacementListError = null;
        },
        // Reset banner list
        resetBannerList: (state) => {
            state.bannerList = [];
            state.bannerListError = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // ─── Get Banner List ───────────────────────────────────────
            .addCase(getBannerList.pending, (state) => {
                state.bannerListLoading = true;
                state.bannerListError = null;
            })
            .addCase(getBannerList.fulfilled, (state, { payload }) => {
                state.bannerListLoading = false;
                console.log('getBannerList payload:', payload);       
                state.bannerList = payload ?? [];
                state.bannerListError = null;
            })
            .addCase(getBannerList.rejected, (state, { payload }) => {
                state.bannerListLoading = false;
                state.bannerList = [];
                state.bannerListError = payload || 'Failed to fetch banner list.';
            })

            // ─── Get Logo Placement List ───────────────────────────────
            .addCase(getLogoPlacementList.pending, (state) => {
                state.logoPlacementListLoading = true;
                state.logoPlacementListError = null;
            })
            .addCase(getLogoPlacementList.fulfilled, (state, { payload }) => {
                state.logoPlacementListLoading = false;
                console.log("payload", payload)
                // payload = { status: true, message: '...', data: Array(3) }
                state.logoPlacementList = payload?.data ?? [];
                state.logoPlacementListError = null;
            })
            .addCase(getLogoPlacementList.rejected, (state, { payload }) => {
                state.logoPlacementListLoading = false;
                state.logoPlacementList = [];
                state.logoPlacementListError = payload || 'Failed to fetch logo placement list.';
            });
    },
});

export const { resetLogoPlacementList, resetBannerList } = BannerLogoSlice.actions;
export default BannerLogoSlice.reducer;