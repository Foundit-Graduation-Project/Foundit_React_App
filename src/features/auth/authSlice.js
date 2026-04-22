import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    loginAPI,
    registerAPI,
    logoutAPI,
    googleLoginAPI,
    verifyOtpAPI,
    resendOtpAPI
} from './authAPI';

export const loginWithGoogle = createAsyncThunk(
    'auth/googleLogin',
    async (googleAccessToken, { rejectWithValue }) => {
        try {
            const data = await googleLoginAPI(googleAccessToken);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await loginAPI(credentials);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await registerAPI(userData);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutAPI();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return null;
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return rejectWithValue(error);
        }
    }
);

// --- NEW THUNKS ---

export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (data, { rejectWithValue }) => {
        try {
            const response = await verifyOtpAPI(data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const resendOTP = createAsyncThunk(
    'auth/resendOTP',
    async (email, { rejectWithValue }) => {
        try {
            const response = await resendOtpAPI(email);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isLoading: false,
        error: null,
        successMessage: null,
        unverifiedEmail: null // 👈 NEW: Stores email temporarily for the OTP screen
    },
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setUnverifiedEmail: (state, action) => {
            state.unverifiedEmail = action.payload;
        },
        clearUnverifiedEmail: (state) => {
            state.unverifiedEmail = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- LOGIN ---
            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.unverifiedEmail = null; // Clear if login succeeds
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                // SMART LOGIC: If backend throws our custom 403 error for unverified accounts
                if (action.payload && action.payload.includes('verify your email')) {
                    // action.meta.arg contains the credentials we sent to the thunk
                    state.unverifiedEmail = action.meta.arg.email;
                }
            })

            // --- REGISTER ---
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                // Automatically save the email so the OTP screen knows who to verify!
                state.unverifiedEmail = action.meta.arg.email;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // --- LOGOUT ---
            .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.unverifiedEmail = null; })
            .addCase(logoutUser.rejected, (state) => { state.user = null; state.unverifiedEmail = null; })

            // --- GOOGLE LOGIN ---
            .addCase(loginWithGoogle.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // --- VERIFY OTP ---
            .addCase(verifyOTP.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.isLoading = false;
                state.unverifiedEmail = null; // Clear it, they are verified!
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearAuthError, setUnverifiedEmail, clearUnverifiedEmail } = authSlice.actions;
export default authSlice.reducer;