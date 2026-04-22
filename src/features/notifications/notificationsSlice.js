import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotificationsAPI, markAsReadAPI, markAllAsReadAPI } from './notificationsAPI';

// --- ASYNC THUNKS ---

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async (page = 1, { rejectWithValue }) => {
        try {
            // 👇 FIX 1: Pass the page number to the API!
            return await fetchNotificationsAPI(page);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (id, { rejectWithValue }) => {
        try {
            const data = await markAsReadAPI(id);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const markAllNotificationsAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await markAllAsReadAPI();
            return true;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// --- SLICE ---

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        items: [],
        unreadCount: 0,
        hasMore: false,
        currentPage: 1,
        isLoading: false,
        isFetchingMore: false,
        error: null
    },
    reducers: {
        addRealtimeNotification: (state, action) => {
            const newNotif = action.payload;
            state.items.unshift(newNotif);
            state.unreadCount += 1;
        },
        clearNotifications: (state) => {
            state.items = [];
            state.unreadCount = 0;
            state.hasMore = false;
            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch All ---
            .addCase(fetchNotifications.pending, (state, action) => {
                // 👇 FIX 2: Check if we are loading page 1 or loading more
                const page = action.meta.arg || 1;
                if (page === 1) {
                    state.isLoading = true;
                } else {
                    state.isFetchingMore = true;
                }
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isFetchingMore = false;

                // 👇 FIX 3: Extract all pagination data from the backend
                const { notifications, unreadCount, hasMore, currentPage } = action.payload;

                // 👇 FIX 4: Append to array if page > 1, otherwise replace
                if (currentPage === 1) {
                    state.items = notifications || [];
                } else {
                    state.items = [...state.items, ...(notifications || [])];
                }

                state.unreadCount = unreadCount || 0;
                state.hasMore = hasMore || false;
                state.currentPage = currentPage || 1;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.isFetchingMore = false;
                state.error = action.payload;
            })

            // --- Mark Single as Read ---
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const updatedNotif = action.payload;
                const index = state.items.findIndex(n => n._id === updatedNotif._id);
                if (index !== -1 && !state.items[index].isRead) {
                    state.items[index].isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })

            // --- Mark All as Read ---
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.items.forEach(n => { n.isRead = true; });
                state.unreadCount = 0;
            });
    }
});

export const { addRealtimeNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;