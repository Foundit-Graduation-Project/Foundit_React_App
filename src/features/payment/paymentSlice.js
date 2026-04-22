import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCheckoutSessionAPI } from './paymentAPI';

export const createCheckoutSession = createAsyncThunk(
    'payment/createCheckoutSession',
    async (paymentData, { rejectWithValue }) => {
        try {
            const data = await createCheckoutSessionAPI(paymentData);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    sessionUrl: null,
    sessionId: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearPaymentError: (state) => {
            state.error = null;
        },
        clearPaymentState: (state) => {
            state.loading = false;
            state.error = null;
            state.sessionUrl = null;
            state.sessionId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionUrl = action.payload.url;
                state.sessionId = action.payload.sessionId;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearPaymentError, clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
