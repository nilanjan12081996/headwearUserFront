'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from './newApi';
import axios from 'axios';
import api from './api';

/* ================= FETCH ALL ORDERS ================= */
export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            const response = await newApi.get(`/api/orders/list?${params.toString()}`);
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
            if (status) params.append('status', status);
            if (date) params.append('date', date);
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
            const [orderRes, stageRes, artworkRes, addressRes] = await Promise.allSettled([
                newApi.get(`/api/orders/${orderId}`),
                api.post(`postgresapi/user/order/order-manage/timeline`, { order_id: orderId }),
                newApi.get(`/api/orders/${orderId}/artwork-details`),
                newApi.get(`/api/orders/${orderId}/customer-addresses`),
            ]);
            return {
                order: orderRes.status === 'fulfilled' ? orderRes.value.data : null,
                stages: stageRes.status === 'fulfilled' && stageRes.value.data?.status_code === 200
                    ? stageRes.value.data.data
                    : null,
                artwork: artworkRes.status === 'fulfilled' ? artworkRes.value.data : [],
                address: addressRes.status === 'fulfilled' ? addressRes.value.data : null,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

/* ================= REORDER PREVIEW ================= */
export const getReorderPreview = createAsyncThunk(
    'orders/getReorderPreview',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await newApi.get(`/api/re-orders/${orderId}/reorder-preview`);
            if (response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Failed to fetch reorder preview');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
        }
    }
);

/* ================= SUBMIT REORDER ================= */
export const submitReorder = createAsyncThunk(
    'orders/submitReorder',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await newApi.post('/api/re-orders/reorder', payload);
            if (response?.status === 200 || response?.status === 201) return response.data;
            return rejectWithValue(response?.data?.message || 'Reorder failed');
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
        }
    }
);

/* ================= SPEND SUMMARY ================= */
export const getSpendSummary = createAsyncThunk(
    'orders/getSpendSummary',
    async (_, { rejectWithValue }) => {
        try {
            const response = await newApi.get(`/api/orders/spend-summary`);
            if (response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.message || 'Failed to fetch spend summary'
                );
            }
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || 'Something went wrong'
            );
        }
    }
);

/* ================= FETCH ALL ORDERS (NO PAGINATION) ================= */
export const getAllOrdersNoPagination = createAsyncThunk(
    'orders/getAllOrdersNoPagination',
    async (_, { rejectWithValue }) => {
        try {
            const firstRes = await newApi.get(`/api/orders/list?page=0&size=10`);
            if (firstRes?.status !== 200) {
                return rejectWithValue(firstRes?.data?.message || 'Failed to fetch orders');
            }

            const firstData = firstRes.data;
            const totalPages = firstData?.totalPages ?? 1;

            const restRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
                newApi.get(`/api/orders/list?page=${i + 1}&size=10`)
            );
            const restResponses = await Promise.all(restRequests);

            const allOrders = [
                ...(firstData?.content ?? []),
                ...restResponses.flatMap((res) => res?.data?.content ?? []),
            ];

            return allOrders;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
        }
    }
);

/* ================= GET INVOICE INFO ================= */
export const getInvoiceByOrder = createAsyncThunk(
    'orders/getInvoiceByOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await newApi.get(`/api/invoices/order/${orderId}`);
            if (response?.status === 200) {
                return response.data;
            }
            return rejectWithValue(response?.data?.message || 'Failed to fetch invoice');
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

/* ================= DOWNLOAD INVOICE ================= */
export const downloadInvoice = createAsyncThunk(
    'orders/downloadInvoice',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await newApi.get(`/api/invoices/download/${orderId}`, {
                responseType: 'blob', // PDF binary data
            });
            if (response?.status === 200) {
                return { blob: response.data, orderId };
            }
            return rejectWithValue('Failed to download invoice');
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const initialState = {
    orders: [],
    // ── Pagination ──
    currentPage: 0,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    // ── Search ──
    searchResults: null,
    searchTotalPages: 1,
    searchTotalElements: 0,
    // ── Detail ──
    selectedOrder: null,
    detailLoading: false,
    loading: false,
    error: null,
    message: null,
    // ── Reorder ──
    reorderPreview: null,
    reorderPreviewLoading: false,
    reorderLoading: false,
    reorderSuccess: false,
    reorderError: null,
    // ── Spend summary ──
    spendSummary: null,
    spendSummaryLoading: false,
    spendSummaryError: null,

    allOrders: [],

    // ── Invoice ──
    invoiceInfo: null,
    invoiceLoading: false,
    invoiceDownloading: false,
    invoiceError: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.error = null;
            state.message = null;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
        clearReorderState: (state) => {
            state.reorderPreview = null;
            state.reorderPreviewLoading = false;
            state.reorderLoading = false;
            state.reorderSuccess = false;
            state.reorderError = null;
        },
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
                //handle both paginated { content: [] } and plain array
                state.orders = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.content)
                        ? payload.content
                        : [];
                state.currentPage = payload?.number ?? 0;
                state.totalPages = payload?.totalPages ?? 1;
                state.totalElements = payload?.totalElements ?? state.orders.length;
                state.pageSize = payload?.size ?? 10;
                state.error = false;
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message = payload;
            })

            /* -------- SEARCH ORDERS -------- */
            .addCase(searchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchOrders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.searchResults = payload?.content ?? [];
                state.searchTotalPages = payload?.totalPages ?? 1;
                state.searchTotalElements = payload?.totalElements ?? 0;
                state.error = false;
            })
            .addCase(searchOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
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
                state.message = payload;
            })

            /* -------- REORDER PREVIEW -------- */
            .addCase(getReorderPreview.pending, (state) => {
                state.reorderPreviewLoading = true;
                state.reorderPreview = null;
                state.reorderError = null;
            })
            .addCase(getReorderPreview.fulfilled, (state, { payload }) => {
                state.reorderPreviewLoading = false;
                state.reorderPreview = payload;
            })
            .addCase(getReorderPreview.rejected, (state, { payload }) => {
                state.reorderPreviewLoading = false;
                state.reorderError = payload;
            })

            /* -------- SUBMIT REORDER -------- */
            .addCase(submitReorder.pending, (state) => {
                state.reorderLoading = true;
                state.reorderSuccess = false;
                state.reorderError = null;
            })
            .addCase(submitReorder.fulfilled, (state) => {
                state.reorderLoading = false;
                state.reorderSuccess = true;
            })
            .addCase(submitReorder.rejected, (state, { payload }) => {
                state.reorderLoading = false;
                state.reorderSuccess = false;
                state.reorderError = payload;
            })

            /* -------- SPEND SUMMARY -------- */
            .addCase(getSpendSummary.pending, (state) => {
                state.spendSummaryLoading = true;
                state.spendSummaryError = null;
            })
            .addCase(getSpendSummary.fulfilled, (state, { payload }) => {
                state.spendSummaryLoading = false;
                state.spendSummary = payload;
            })
            .addCase(getSpendSummary.rejected, (state, { payload }) => {
                state.spendSummaryLoading = false;
                state.spendSummaryError = payload;
            })

            /* -------- GET ALL ORDERS NO PAGINATION -------- */
            .addCase(getAllOrdersNoPagination.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrdersNoPagination.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allOrders = payload;
                state.error = false;
            })
            .addCase(getAllOrdersNoPagination.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message = payload;
            })

            /* -------- GET INVOICE INFO -------- */
            .addCase(getInvoiceByOrder.pending, (state) => {
                state.invoiceLoading = true;
                state.invoiceError = null;
            })
            .addCase(getInvoiceByOrder.fulfilled, (state, { payload }) => {
                state.invoiceLoading = false;
                state.invoiceInfo = payload;
            })
            .addCase(getInvoiceByOrder.rejected, (state, { payload }) => {
                state.invoiceLoading = false;
                state.invoiceError = payload;
            })

            /* -------- DOWNLOAD INVOICE -------- */
            .addCase(downloadInvoice.pending, (state) => {
                state.invoiceDownloading = true;
            })
            .addCase(downloadInvoice.fulfilled, (state) => {
                state.invoiceDownloading = false;
            })
            .addCase(downloadInvoice.rejected, (state, { payload }) => {
                state.invoiceDownloading = false;
                state.invoiceError = payload;
            })
    },
});

export const { clearOrderState, clearSelectedOrder, clearReorderState } = ordersSlice.actions;
export default ordersSlice.reducer;

// 'use client';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import newApi from './newApi';

// /* ================= FETCH ALL ORDERS ================= */
// export const getAllOrders = createAsyncThunk(
//     'orders/getAllOrders',
//     async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
//         try {
//             const params = new URLSearchParams();
//             params.append('page', page);
//             params.append('size', size);
//             const response = await newApi.get(`/api/orders/list?${params.toString()}`);
//             if (response?.status === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(
//                     response?.data?.message || 'Failed to fetch orders'
//                 );
//             }
//         } catch (err) {
//             return rejectWithValue(
//                 err.response?.data?.message || err.message || 'Something went wrong'
//             );
//         }
//     }
// );

// /* ================= SEARCH ORDERS ================= */
// export const searchOrders = createAsyncThunk(
//     'orders/searchOrders',
//     async ({ orderNumber = '', status = '', date = '', page = 0, size = 10 }, { rejectWithValue }) => {
//         try {
//             const params = new URLSearchParams();
//             if (orderNumber) params.append('orderNumber', orderNumber);
//             if (status) params.append('status', status);
//             if (date) params.append('date', date);
//             params.append('page', page);
//             params.append('size', size);

//             const response = await newApi.get(`/api/orders/search?${params.toString()}`);
//             if (response?.status === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.message || 'Search failed');
//             }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// /* ================= FETCH SINGLE ORDER DETAIL ================= */
// export const getSingleOrder = createAsyncThunk(
//     'orders/getSingleOrder',
//     async (orderId, { rejectWithValue }) => {
//         try {
//             const [orderRes, stageRes, artworkRes, addressRes] = await Promise.allSettled([
//                 newApi.get(`/api/orders/${orderId}`),
//                 newApi.get(`/api/orders/${orderId}/stage-info`),
//                 newApi.get(`/api/orders/${orderId}/artwork-details`),
//                 newApi.get(`/api/orders/${orderId}/customer-addresses`),
//             ]);
//             return {
//                 order: orderRes.status === 'fulfilled' ? orderRes.value.data : null,
//                 stages: stageRes.status === 'fulfilled' ? stageRes.value.data : [],
//                 artwork: artworkRes.status === 'fulfilled' ? artworkRes.value.data : [],
//                 address: addressRes.status === 'fulfilled' ? addressRes.value.data : null,
//             };
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// /* ================= REORDER PREVIEW ================= */
// export const getReorderPreview = createAsyncThunk(
//     'orders/getReorderPreview',
//     async (orderId, { rejectWithValue }) => {
//         try {
//             const response = await newApi.get(`/api/re-orders/${orderId}/reorder-preview`);
//             if (response?.status === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.message || 'Failed to fetch reorder preview');
//             }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
//         }
//     }
// );

// /* ================= SUBMIT REORDER ================= */
// export const submitReorder = createAsyncThunk(
//     'orders/submitReorder',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const response = await newApi.post('/api/re-orders/reorder', payload);
//             if (response?.status === 200 || response?.status === 201) return response.data;
//             return rejectWithValue(response?.data?.message || 'Reorder failed');
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
//         }
//     }
// );

// /* ================= SPEND SUMMARY ================= */
// export const getSpendSummary = createAsyncThunk(
//     'orders/getSpendSummary',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await newApi.get(`/api/orders/spend-summary`);
//             if (response?.status === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(
//                     response?.data?.message || 'Failed to fetch spend summary'
//                 );
//             }
//         } catch (err) {
//             return rejectWithValue(
//                 err.response?.data?.message || err.message || 'Something went wrong'
//             );
//         }
//     }
// );

// /* ================= FETCH ALL ORDERS (NO PAGINATION) ================= */
// export const getAllOrdersNoPagination = createAsyncThunk(
//     'orders/getAllOrdersNoPagination',
//     async (_, { rejectWithValue }) => {
//         try {
//             const firstRes = await newApi.get(`/api/orders/list?page=0&size=10`);
//             if (firstRes?.status !== 200) {
//                 return rejectWithValue(firstRes?.data?.message || 'Failed to fetch orders');
//             }

//             const firstData = firstRes.data;
//             const totalPages = firstData?.totalPages ?? 1;

//             const restRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
//                 newApi.get(`/api/orders/list?page=${i + 1}&size=10`)
//             );
//             const restResponses = await Promise.all(restRequests);

//             const allOrders = [
//                 ...(firstData?.content ?? []),
//                 ...restResponses.flatMap((res) => res?.data?.content ?? []),
//             ];

//             return allOrders;
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message || 'Something went wrong');
//         }
//     }
// );

// /* ================= GET INVOICE INFO ================= */
// export const getInvoiceByOrder = createAsyncThunk(
//     'orders/getInvoiceByOrder',
//     async (orderId, { rejectWithValue }) => {
//         try {
//             const response = await newApi.get(`/api/invoices/order/${orderId}`);
//             if (response?.status === 200) {
//                 return response.data;
//             }
//             return rejectWithValue(response?.data?.message || 'Failed to fetch invoice');
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// /* ================= DOWNLOAD INVOICE ================= */
// export const downloadInvoice = createAsyncThunk(
//     'orders/downloadInvoice',
//     async (orderId, { rejectWithValue }) => {
//         try {
//             const response = await newApi.get(`/api/invoices/download/${orderId}`, {
//                 responseType: 'blob', // PDF binary data
//             });
//             if (response?.status === 200) {
//                 return { blob: response.data, orderId };
//             }
//             return rejectWithValue('Failed to download invoice');
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// const initialState = {
//     orders: [],
//     // ── Pagination ──
//     currentPage: 0,
//     totalPages: 1,
//     totalElements: 0,
//     pageSize: 10,
//     // ── Search ──
//     searchResults: null,
//     searchTotalPages: 1,
//     searchTotalElements: 0,
//     // ── Detail ──
//     selectedOrder: null,
//     detailLoading: false,
//     loading: false,
//     error: null,
//     message: null,
//     // ── Reorder ──
//     reorderPreview: null,
//     reorderPreviewLoading: false,
//     reorderLoading: false,
//     reorderSuccess: false,
//     reorderError: null,
//     // ── Spend summary ──
//     spendSummary: null,
//     spendSummaryLoading: false,
//     spendSummaryError: null,

//     allOrders: [],

//     // ── Invoice ──
//     invoiceInfo: null,
//     invoiceLoading: false,
//     invoiceDownloading: false,
//     invoiceError: null,
// };

// const ordersSlice = createSlice({
//     name: 'orders',
//     initialState,
//     reducers: {
//         clearOrderState: (state) => {
//             state.error = null;
//             state.message = null;
//         },
//         clearSelectedOrder: (state) => {
//             state.selectedOrder = null;
//         },
//         clearReorderState: (state) => {
//             state.reorderPreview = null;
//             state.reorderPreviewLoading = false;
//             state.reorderLoading = false;
//             state.reorderSuccess = false;
//             state.reorderError = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             /* -------- GET ALL ORDERS -------- */
//             .addCase(getAllOrders.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getAllOrders.fulfilled, (state, { payload }) => {
//                 state.loading = false;
//                 //handle both paginated { content: [] } and plain array
//                 state.orders = Array.isArray(payload)
//                     ? payload
//                     : Array.isArray(payload?.content)
//                         ? payload.content
//                         : [];
//                 state.currentPage = payload?.number ?? 0;
//                 state.totalPages = payload?.totalPages ?? 1;
//                 state.totalElements = payload?.totalElements ?? state.orders.length;
//                 state.pageSize = payload?.size ?? 10;
//                 state.error = false;
//             })
//             .addCase(getAllOrders.rejected, (state, { payload }) => {
//                 state.loading = false;
//                 state.error = true;
//                 state.message = payload;
//             })

//             /* -------- SEARCH ORDERS -------- */
//             .addCase(searchOrders.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(searchOrders.fulfilled, (state, { payload }) => {
//                 state.loading = false;
//                 state.searchResults = payload?.content ?? [];
//                 state.searchTotalPages = payload?.totalPages ?? 1;
//                 state.searchTotalElements = payload?.totalElements ?? 0;
//                 state.error = false;
//             })
//             .addCase(searchOrders.rejected, (state, { payload }) => {
//                 state.loading = false;
//                 state.error = true;
//                 state.message = payload;
//             })

//             /* -------- GET SINGLE ORDER -------- */
//             .addCase(getSingleOrder.pending, (state) => {
//                 state.detailLoading = true;
//                 state.selectedOrder = null;
//             })
//             .addCase(getSingleOrder.fulfilled, (state, { payload }) => {
//                 state.detailLoading = false;
//                 state.selectedOrder = payload;
//             })
//             .addCase(getSingleOrder.rejected, (state, { payload }) => {
//                 state.detailLoading = false;
//                 state.message = payload;
//             })

//             /* -------- REORDER PREVIEW -------- */
//             .addCase(getReorderPreview.pending, (state) => {
//                 state.reorderPreviewLoading = true;
//                 state.reorderPreview = null;
//                 state.reorderError = null;
//             })
//             .addCase(getReorderPreview.fulfilled, (state, { payload }) => {
//                 state.reorderPreviewLoading = false;
//                 state.reorderPreview = payload;
//             })
//             .addCase(getReorderPreview.rejected, (state, { payload }) => {
//                 state.reorderPreviewLoading = false;
//                 state.reorderError = payload;
//             })

//             /* -------- SUBMIT REORDER -------- */
//             .addCase(submitReorder.pending, (state) => {
//                 state.reorderLoading = true;
//                 state.reorderSuccess = false;
//                 state.reorderError = null;
//             })
//             .addCase(submitReorder.fulfilled, (state) => {
//                 state.reorderLoading = false;
//                 state.reorderSuccess = true;
//             })
//             .addCase(submitReorder.rejected, (state, { payload }) => {
//                 state.reorderLoading = false;
//                 state.reorderSuccess = false;
//                 state.reorderError = payload;
//             })

//             /* -------- SPEND SUMMARY -------- */
//             .addCase(getSpendSummary.pending, (state) => {
//                 state.spendSummaryLoading = true;
//                 state.spendSummaryError = null;
//             })
//             .addCase(getSpendSummary.fulfilled, (state, { payload }) => {
//                 state.spendSummaryLoading = false;
//                 state.spendSummary = payload;
//             })
//             .addCase(getSpendSummary.rejected, (state, { payload }) => {
//                 state.spendSummaryLoading = false;
//                 state.spendSummaryError = payload;
//             })

//             /* -------- GET ALL ORDERS NO PAGINATION -------- */
//             .addCase(getAllOrdersNoPagination.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getAllOrdersNoPagination.fulfilled, (state, { payload }) => {
//                 state.loading = false;
//                 state.allOrders = payload;
//                 state.error = false;
//             })
//             .addCase(getAllOrdersNoPagination.rejected, (state, { payload }) => {
//                 state.loading = false;
//                 state.error = true;
//                 state.message = payload;
//             })

//             /* -------- GET INVOICE INFO -------- */
//             .addCase(getInvoiceByOrder.pending, (state) => {
//                 state.invoiceLoading = true;
//                 state.invoiceError = null;
//             })
//             .addCase(getInvoiceByOrder.fulfilled, (state, { payload }) => {
//                 state.invoiceLoading = false;
//                 state.invoiceInfo = payload;
//             })
//             .addCase(getInvoiceByOrder.rejected, (state, { payload }) => {
//                 state.invoiceLoading = false;
//                 state.invoiceError = payload;
//             })

//             /* -------- DOWNLOAD INVOICE -------- */
//             .addCase(downloadInvoice.pending, (state) => {
//                 state.invoiceDownloading = true;
//             })
//             .addCase(downloadInvoice.fulfilled, (state) => {
//                 state.invoiceDownloading = false;
//             })
//             .addCase(downloadInvoice.rejected, (state, { payload }) => {
//                 state.invoiceDownloading = false;
//                 state.invoiceError = payload;
//             })
//     },
// });

// export const { clearOrderState, clearSelectedOrder, clearReorderState } = ordersSlice.actions;
// export default ordersSlice.reducer;