import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchAPI } from './matchAPI';

// Thunk to trigger search for potential matches for a new report
export const triggerFindMatches = createAsyncThunk(
  'match/findMatches',
  async (reportId, { rejectWithValue }) => {
    try {
      return await matchAPI.findMatchesForReport(reportId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to get current user's match list (proposed or active)
export const fetchMyMatches = createAsyncThunk(
  'match/fetchMyMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await matchAPI.getMyMatches();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to accept a match proposal
export const acceptMatchProposal = createAsyncThunk(
  'match/accept',
  async (matchId, { rejectWithValue }) => {
    try {
      return await matchAPI.acceptMatch(matchId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to reject a match proposal
export const rejectMatchProposal = createAsyncThunk(
  'match/reject',
  async (matchId, { rejectWithValue }) => {
    try {
      return await matchAPI.rejectMatch(matchId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to strictly resolve a fully accepted match
export const resolveMatchProposal = createAsyncThunk(
  'match/resolve',
  async (matchId, { rejectWithValue }) => {
    try {
      return await matchAPI.resolveMatch(matchId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    matches: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMatchMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* Fetch My Matches */
      .addCase(fetchMyMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyMatches.fulfilled, (state, action) => {
        state.loading = false;
        // Adjust based on your JSend response structure (match property from controller)
        state.matches = action.payload.data?.match || [];
      })
      .addCase(fetchMyMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load matches";
      })

      /* Accept Match */
      .addCase(acceptMatchProposal.fulfilled, (state, action) => {
        state.successMessage = action.payload.data?.message;
        // Update the specific match status in the state without re-fetching
        const updatedMatch = action.payload.data?.match;
        const index = state.matches.findIndex(m => m._id === updatedMatch._id);
        if (index !== -1) {
          state.matches[index] = updatedMatch;
        }
      })

      /* Reject Match */
      .addCase(rejectMatchProposal.fulfilled, (state, action) => {
        state.successMessage = action.payload.data?.message || "Match successfully rejected.";
        const updatedMatch = action.payload.data?.match;
        const index = state.matches.findIndex(m => m._id === updatedMatch._id);
        if (index !== -1) {
          state.matches[index] = updatedMatch;
        }
      })

      /* Resolve Match */
      .addCase(resolveMatchProposal.fulfilled, (state, action) => {
        state.successMessage = action.payload.data?.message;
        const updatedMatch = action.payload.data?.match;
        const index = state.matches.findIndex(m => m._id === updatedMatch._id);
        if (index !== -1) {
          state.matches[index] = updatedMatch;
        }
      });
  }
});

export const { clearMatchMessages } = matchSlice.actions;
export default matchSlice.reducer;