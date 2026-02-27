'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


/* ================= SEND SECURITY CODE ================= */

export const sendSecurityCode = createAsyncThunk(
    'auth/sendSecurityCode',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(
                '/postgresapi/user/address/send-code',
                userInput
            );

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || 'Failed to send security code'
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

/* ================= VERIFY SECURITY CODE ================= */

export const verifySecurityCode = createAsyncThunk(
    'auth/verifySecurityCode',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(
                '/postgresapi/user/address/verify-code',
                userInput
            );

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || 'Security code verification failed'
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

/* ================= REGISTER ================= */

export const registerCustomer = createAsyncThunk(
    'auth/registerCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(
                '/api/customers/register',
                userInput
            );

            if (response?.data?.status_code === 200 || response?.data?.status_code === 201) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || 'Registration failed'
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

/* ================= LOGIN ================= */

export const loginCustomer = createAsyncThunk(
    'auth/loginCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(
                '/api/customers/login',
                userInput
            );

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || 'Login failed'
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

/* ================= LOGOUT ================= */

export const logoutCustomer = createAsyncThunk(
    'auth/logoutCustomer',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/customers/logout');

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(
                    response?.data?.errors || 'Logout failed'
                );
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const initialState = {
    message: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    loadingSendCode: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* -------- SEND SECURITY CODE -------- */
            .addCase(sendSecurityCode.pending, (state) => {
                state.loadingSendCode = true;
                state.error = null;
                state.message = null;
            })
            .addCase(sendSecurityCode.fulfilled, (state, { payload }) => {
                state.loadingSendCode = false;
                state.message = payload;
                state.error = false;
            })
            .addCase(sendSecurityCode.rejected, (state, { payload }) => {
                state.loadingSendCode = false;
                state.error = true;
                state.message =
                    payload?.message || 'Failed to send security code';
            })

            /* -------- VERIFY SECURITY CODE -------- */
            .addCase(verifySecurityCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifySecurityCode.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload;
                state.error = false;
            })
            .addCase(verifySecurityCode.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message =
                    payload?.message || 'Security code verification failed';
            })

            /* -------- REGISTER -------- */
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(registerCustomer.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.message = payload;
                state.error = false;
                if (payload?.access_token) {
                    sessionStorage.setItem(
                        'showmeheadwear',
                        JSON.stringify({ token: payload.access_token })
                    );
                }
            })
            .addCase(registerCustomer.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message =
                    payload?.message || 'Registration failed';
            })

            /* -------- LOGIN -------- */
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginCustomer.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.message = payload;
                state.error = false;
                if (payload?.access_token) {
                    sessionStorage.setItem(
                        'showmeheadwear',
                        JSON.stringify({ token: payload.access_token })
                    );
                }
                if (payload?.data?.id) {
                    sessionStorage.setItem(
                        'user_id',
                        JSON.stringify({ user_id: payload.data.id })
                    );
                }
            })
            .addCase(loginCustomer.rejected, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = true;
                state.message =
                    payload?.message || 'Login failed';
            })

            /* -------- LOGOUT -------- */
            .addCase(logoutCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutCustomer.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.message = payload;
                state.error = false;
                sessionStorage.removeItem('showmeheadwear');
                sessionStorage.removeItem('user_id');
            })
            .addCase(logoutCustomer.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.message =
                    payload?.message || 'Logout failed';
            });
    },
});

export default authSlice.reducer;




// 'use client';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from './api';

// export const registerCustomer = createAsyncThunk(
//     'registerCustomer',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post('/user/user-auth/sign-up', userInput);
//             if (response?.data?.status_code === 201) {
//                 return response.data;
//             } else {
//                 if (response?.data?.errors) {
//                     return rejectWithValue(response.data.errors);
//                 } else {
//                     return rejectWithValue('Something went wrong.');
//                 }
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

// export const otpVerifyCustomer = createAsyncThunk(
//     'otpVerifyCustomer',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post('/api/v1/customer/auth/verify-otp', userInput);
//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.response);

//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// )

// export const resendOtpCustomer = createAsyncThunk(
//     'resendOtpCustomer',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post('/api/v1/customer/auth/resend-otp', userInput);
//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 if (response?.data?.errors) {
//                     return rejectWithValue(response.data.errors);
//                 } else {
//                     return rejectWithValue('Failed to send OTP');
//                 }
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

// export const loginCustomer = createAsyncThunk(
//     'loginCustomer',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post('/user/user-auth/sign-in', userInput);
//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.response);

//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

// export const detectIccid = createAsyncThunk(
//     'detectIccid',
//     async (iccid, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/api/v1/customer/detect-iccid?iccid=${iccid}`);
//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response?.data?.response);

//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

// /* ================= SEND SECURITY CODE ================= */

// export const sendSecurityCode = createAsyncThunk(
//     'auth/sendSecurityCode',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post(
//                 '/postgresapi/user/address/send-code',
//                 userInput
//             );

//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(
//                     response?.data?.errors || 'Failed to send security code'
//                 );
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );

// /* ================= VERIFY SECURITY CODE ================= */

// export const verifySecurityCode = createAsyncThunk(
//     'auth/verifySecurityCode',
//     async (userInput, { rejectWithValue }) => {
//         try {
//             const response = await api.post(
//                 '/postgresapi/user/address/verify-code',
//                 userInput
//             );

//             if (response?.data?.status_code === 200) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(
//                     response?.data?.errors || 'Security code verification failed'
//                 );
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );


// const initialState = {
//     message: null,
//     error: null,
//     loading: false,
//     isLoggedIn: false,
//     loadingIccid: false,
//     loadingSendCode: false,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         clearCurrentUser: (state) => {
//             state.currentUser = {};
//         },
//         resetAfterLoggedIn: (state) => {
//             state = { ...initialState, isLoggedIn: true };
//         },
//         logout: (state) => {
//             state.isLoggedIn = false;
//             sessionStorage.removeItem('cryptoToken');
//             sessionStorage.removeItem('user_id');
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerCustomer.pending, (state) => {
//                 state.message = null;
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerCustomer.fulfilled, (state, { payload }) => {
//                 const { access_token, data, refresh_token } = payload;

//                 state.loading = false;
//                 state.isLoggedIn = true;
//                 state.message = payload;
//                 sessionStorage.setItem(
//                     'cryptoToken',
//                     JSON.stringify({ token: access_token })
//                 );
//             })
//             .addCase(registerCustomer.rejected, (state, { payload }) => {

//                 state.loading = false;
//                 state.error = payload;
//             })

//             .addCase(otpVerifyCustomer.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(otpVerifyCustomer.fulfilled, (state, { payload }) => {
//                 state.loading = false
//                 state.message = payload
//                 state.error = false
//             })
//             .addCase(otpVerifyCustomer.rejected, (state, { payload }) => {
//                 state.error = true;
//                 state.message =
//                     payload !== undefined && payload.message
//                         ? payload.message
//                         : 'Something went wrong. Try again later.';
//             })

//             .addCase(resendOtpCustomer.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(resendOtpCustomer.fulfilled, (state, { payload }) => {
//                 state.loading = false
//                 state.message = payload
//                 state.error = false
//             })
//             .addCase(resendOtpCustomer.rejected, (state, { payload }) => {
//                 state.error = true;
//                 state.message =
//                     payload !== undefined && payload.message
//                         ? payload.message
//                         : 'Something went wrong. Try again later.';
//             })

//             .addCase(loginCustomer.pending, (state) => {
//                 state.loading = true;
//                 state.isLoggedIn = false;
//                 state.error = false;
//             })
//             .addCase(loginCustomer.fulfilled, (state, { payload }) => {
//                 const { access_token, data, refresh_token } = payload;
//                 state.loading = false;
//                 state.isLoggedIn = true;
//                 sessionStorage.setItem(
//                     'user_id',
//                     JSON.stringify({ user_id: data?.id })
//                 );
//                 sessionStorage.setItem(
//                     'cryptoToken',
//                     JSON.stringify({ token: access_token })
//                 );
//             })
//             .addCase(loginCustomer.rejected, (state, { payload }) => {
//                 state.loading = false;
//                 state.isLoggedIn = false;
//                 state.error = true;
//                 state.message =
//                     payload !== undefined && payload.message
//                         ? payload.message
//                         : 'Something went wrong. Try again later.';
//             })

//             .addCase(detectIccid.pending, (state) => {
//                 state.loadingIccid = true
//             })
//             .addCase(detectIccid.fulfilled, (state, { payload }) => {
//                 state.loadingIccid = false
//                 state.message = payload
//                 state.error = false
//             })
//             .addCase(detectIccid.rejected, (state, { payload }) => {
//                 state.loadingIccid = false
//                 state.error = true;
//                 state.message =
//                     payload !== undefined && payload.message
//                         ? payload.message
//                         : 'Something went wrong. Try again later.';
//             })

//             /* -------- SEND SECURITY CODE -------- */
//             .addCase(sendSecurityCode.pending, (state) => {
//                 state.loadingSendCode = true;
//                 state.error = null;
//                 state.message = null;
//             })
//             .addCase(sendSecurityCode.fulfilled, (state, { payload }) => {
//                 state.loadingSendCode = false;
//                 state.message = payload;
//                 state.error = false;
//             })
//             .addCase(sendSecurityCode.rejected, (state, { payload }) => {
//                 state.loadingSendCode = false;
//                 state.error = true;
//                 state.message =
//                     payload?.message || 'Failed to send security code';
//             })

//             /* -------- VERIFY SECURITY CODE -------- */
//             .addCase(verifySecurityCode.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(verifySecurityCode.fulfilled, (state, { payload }) => {
//                 state.loading = false;
//                 state.message = payload;
//                 state.error = false;
//             })
//             .addCase(verifySecurityCode.rejected, (state, { payload }) => {
//                 state.loading = false;
//                 state.error = true;
//                 state.message =
//                     payload?.message || 'Security code verification failed';
//             });

//     },
// });
// export const { clearCurrentUser, resetAfterLoggedIn, logout } = authSlice.actions;

// export default authSlice.reducer;
