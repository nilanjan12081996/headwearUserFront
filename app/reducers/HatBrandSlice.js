import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";


export const getHatBrandList = createAsyncThunk(
    "hatBrand/getHatBrandList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `postgresapi/user/brand/list`
            );

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


// export const getHatListDetail = createAsyncThunk(
//     "hatBrand/getHatListDetail",
//     async ({ brandId }, { rejectWithValue }) => {
//         try {
//             const response = await api.get(
//                 `postgresapi/user/hat/list?brand_id=${brandId}`
//             );

//             if (response?.data?.status_code === 200) {
//                 return {
//                     brandId,
//                     data: response.data
//                 };
//             } else {
//                 return rejectWithValue(
//                     response?.data?.errors || "Something went wrong."
//                 );
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

export const getHatListDetail = createAsyncThunk(
    "hatBrand/getHatListDetail",
    async (
        { brandId, page = 1, limit = 10 },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.get(
                `postgresapi/user/hat/list`,
                {
                    params: {
                        brand_id: brandId,
                        page,
                        limit,
                    },
                }
            );

            if (response?.data?.status_code === 200) {
                return {
                    brandId,
                    hats: response.data.data,
                    pagination: response.data.pagination,
                };
            } else {
                return rejectWithValue(
                    response?.data?.errors || "Something went wrong."
                );
            }
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);


export const getSingleHatDetail = createAsyncThunk(
    "hatBrand/getSingleHatDetail",
    async ({ hatId }, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `postgresapi/user/hat/detail/${hatId}`
            );

            if (response?.data?.status_code === 200) {
                return {
                    hatId,
                    data: response.data, // detail object
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
    singleHatDetail: null
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

                const { brandId, hats, pagination } = payload;

                state.brandWiseHatList[brandId] = {
                    list: hats,
                    pagination: pagination,
                };

                state.error = null;
            })
            .addCase(getHatListDetail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })


            .addCase(getSingleHatDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleHatDetail.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.singleHatDetail = payload;
                state.error = null;
            })
            .addCase(getSingleHatDetail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

    },
});

export default hatBrandSlice.reducer;
