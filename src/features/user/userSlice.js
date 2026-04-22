// User slice structure.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeAPI, updateMeAPI, updateAvatarAPI } from "./userAPI";

// ==========================
// THUNKS
// ==========================

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        return await getMeAPI();
    } catch (err) {
        return thunkAPI.rejectWithValue(err); // ✅ matches your axios
    }
});

export const updateMe = createAsyncThunk(
    "user/updateMe",
    async (data, thunkAPI) => {
        try {
            return await updateMeAPI(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const updateAvatar = createAsyncThunk(
    "user/updateAvatar",
    async (file, thunkAPI) => {
        try {
            return await updateAvatarAPI(file);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

// ==========================
// SLICE
// ==========================

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("accessToken");
        },
    },
    extraReducers: (builder) => {
        builder

            // ================= GET ME =================
            .addCase(getMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= UPDATE ME =================
            .addCase(updateMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= UPDATE AVATAR =================
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
