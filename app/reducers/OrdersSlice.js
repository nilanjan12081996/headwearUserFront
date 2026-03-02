'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from './newApi';

/* ================= FETCH ALL ORDERS ================= */
export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            // Endpoint updated to /api/orders/list
            const response = await newApi.get('/api/orders/list');

            // Apnar logic onujayi 200 check kora hochhe
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.message || 'Failed to fetch orders'
                );
            }
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || 'Something went wrong'
            );
        }
    }
);

const initialState = {
    orders: [],
    loading: false,
    error: null,
    message: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            /* -------- GET ALL ORDERS -------- */
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.loading = false;
                // API response structure onujayi payload.data ba payload set korun
                state.orders = payload.data || []; 
                state.error = false;
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message = payload;
            });
    },
});

export const { clearOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;