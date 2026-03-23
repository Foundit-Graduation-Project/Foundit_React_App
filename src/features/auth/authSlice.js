import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, logoutAPI, googleLoginAPI } from './authAPI';

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

// Async Thunk for Login
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

// Async Thunk for Register
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await registerAPI(userData);
            return data; // Usually returns a success message
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Async Thunk for Logout (Hits backend to clear cookies/DB)
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutAPI();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return null;
        } catch (error) {
            // Even if backend fails, clear frontend state to be safe
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
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
        successMessage: null // Added to show "Registration Successful" alerts
    },
    reducers: {
        // We can keep a manual clearError reducer if needed for UI cleanup
        clearAuthError: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- LOGIN ---
            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // --- REGISTER ---
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // --- LOGOUT ---
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.user = null; // Force logout on frontend anyway
            })
            .addCase(loginWithGoogle.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;