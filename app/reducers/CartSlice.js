import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const addCart = createAsyncThunk(
    'addCart',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/cart/add-cart`, userInput);
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

export const uploadLogo = createAsyncThunk(
    'uploadLogo',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`postgresapi/user/logo/upload-logo`, userInput);
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

export const addCartUUID = createAsyncThunk(
    'addCartUUID',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/cart/add`, userInput);
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

export const addCartGroup = createAsyncThunk(
    'addCartGroup',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`user/cart/group/save`, userInput);
            console.log("Cart Group Response", response);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.errors || "Something went wrong.");
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const addCartItem = createAsyncThunk(
    'addCartItem',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`postgresapi/user/cart/items-add`, userInput);
            console.log("Cart Item Response", response);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.errors || "Something went wrong.");
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ cart_item_id, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`user/cart/item/update/${cart_item_id}`, { quantity });

            console.log("Cart Item Response", response);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.errors || "Something went wrong.");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to update cart item";
            return rejectWithValue(errorMessage);
        }
    }
);

export const cartList = createAsyncThunk(
    'cart/cartList',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`user/cart/list?id=${id}&type=sessionUUID`);

            console.log("Cart Item Response", response);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.errors || "Something went wrong.");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to update cart item";
            return rejectWithValue(errorMessage);
        }
    }
);


export const getDecorationType = createAsyncThunk(
    'getDecorationType',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/postgresapi/user/decoration/list`);

            console.log("Cart Item Response", response);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.errors || "Something went wrong.");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to update cart item";
            return rejectWithValue(errorMessage);
        }
    }
);



const initialState = {
    loading: false,
    error: false,
    cartData: [],
    uploadLogoData: "",
    uuidData: "",
    groupData: "",
    itemData: "",
    updateData: '',
    cartListItem: '',
    decorationList:[]
}

const CartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(addCart.pending, (state) => {
                state.loading = true
            })
                .addCase(addCart.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.cartData = payload
                    state.error = false
                })
                .addCase(addCart.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(uploadLogo.pending, (state) => {
                    state.loading = true
                })
                .addCase(uploadLogo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.uploadLogoData = payload
                    state.error = false
                })
                .addCase(uploadLogo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(addCartUUID.pending, (state) => {
                    state.loading = true
                })
                .addCase(addCartUUID.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.uuidData = payload
                    state.error = false
                })
                .addCase(addCartUUID.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })

                .addCase(addCartGroup.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addCartGroup.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.groupData = payload;
                    state.error = false;
                })
                .addCase(addCartGroup.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(addCartItem.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addCartItem.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.itemData = payload;
                    state.error = false;
                })
                .addCase(addCartItem.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(updateCartItem.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updateCartItem.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.updateData = payload;
                    state.error = false;
                })
                .addCase(updateCartItem.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(cartList.pending, (state) => {
                    state.loading = true;
                })
                .addCase(cartList.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.cartListItem = payload;
                    state.error = false;
                })
                .addCase(cartList.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })
                    .addCase(getDecorationType.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getDecorationType.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.decorationList = payload;
                    state.error = false;
                })
                .addCase(getDecorationType.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })


        }
    }
)
export default CartSlice.reducer;