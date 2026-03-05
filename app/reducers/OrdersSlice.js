'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from './newApi';

/* ================= FETCH ALL ORDERS ================= */
export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get('/api/orders/list');
            if (response?.status === 200) {
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

/* ================= SEARCH ORDERS ================= */
export const searchOrders = createAsyncThunk(
    'orders/searchOrders',
    async ({ orderNumber = '', status = '', date = '', page = 0, size = 10 }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (orderNumber) params.append('orderNumber', orderNumber);
            if (status)      params.append('status', status);
            if (date)        params.append('date', date);
            params.append('page', page);
            params.append('size', size);

            const response = await newApi.get(`/api/orders/search?${params.toString()}`);
            if (response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Search failed');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

/* ================= FETCH SINGLE ORDER DETAIL ================= */
export const getSingleOrder = createAsyncThunk(
    'orders/getSingleOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            // Promise.allSettled — ekta fail korle baki gulo kaj korbe
            const [orderRes, stageRes, artworkRes, addressRes] = await Promise.allSettled([
                newApi.get(`/api/orders/${orderId}`),
                newApi.get(`/api/orders/${orderId}/stage-info`),
                newApi.get(`/api/orders/${orderId}/artwork-details`),
                newApi.get(`/api/orders/${orderId}/customer-addresses`),
            ]);
            return {
                order:   orderRes.status   === 'fulfilled' ? orderRes.value.data   : null,
                stages:  stageRes.status   === 'fulfilled' ? stageRes.value.data   : [],
                artwork: artworkRes.status === 'fulfilled' ? artworkRes.value.data : [],
                address: addressRes.status === 'fulfilled' ? addressRes.value.data : null,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const initialState = {
    orders:        [],
    searchResults: null,
    selectedOrder: null,
    detailLoading: false,
    loading:       false,
    error:         null,
    message:       null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.error   = null;
            state.message = null;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* -------- GET ALL ORDERS -------- */
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.orders  = Array.isArray(payload) ? payload : [];
                state.error   = false;
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error   = true;
                state.message = payload;
            })

            /* -------- SEARCH ORDERS -------- */
            .addCase(searchOrders.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(searchOrders.fulfilled, (state, { payload }) => {
                state.loading       = false;
                state.searchResults = payload.content || [];
                state.error         = false;
            })
            .addCase(searchOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error   = true;
                state.message = payload;
            })

            /* -------- GET SINGLE ORDER -------- */
            .addCase(getSingleOrder.pending, (state) => {
                state.detailLoading = true;
                state.selectedOrder = null;
            })
            .addCase(getSingleOrder.fulfilled, (state, { payload }) => {
                state.detailLoading = false;
                state.selectedOrder = payload;
            })
            .addCase(getSingleOrder.rejected, (state, { payload }) => {
                state.detailLoading = false;
                state.message       = payload;
            });
    },
});

export const { clearOrderState, clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;