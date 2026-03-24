import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reportsAPI } from "./reportsAPI";



// Create a new report

export const createReport = createAsyncThunk(
  "report/createReport",
  async (data, { rejectWithValue }) => {
    try {
      return await reportsAPI.createReport(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);


// Get My Reports
export const fetchMyReports = createAsyncThunk(
  "report/fetchMyReports",
  async (params, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getMyReports(params);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch your reports",
      );
    }
  },
);

export const reportsSlice = createSlice({
  name: "report",
  initialState: {
    formData: {
      itemName: "",
      category: "", 
      subCategory: "",
      date: "", 
      locationName: "", 
      description: "",
      images: [],
    },
    progress: 0,
    selectedReport: null,
    // Backend data + loading state
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = {
        itemName: "",
        category: "",
        subCategory: "",
        date: "",
        locationName: "",
        description: "",
        images: [],
      };
      state.progress = 0;
    },
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
  },
  //
  extraReducers: (builder) => {
    builder
   

      // CREATE REPORT
      .addCase(createReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new report returned from backend to the top of the list
        const newReport = action.payload.data?.report || action.payload.report;
       if (!Array.isArray(state.reports)) {
    state.reports = [];
  }
        if (newReport) {
          state.reports.unshift(newReport);
        }
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })      
      // Add this to your extraReducers in reportsSlice.js
      .addCase(fetchMyReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyReports.fulfilled, (state, action) => {
        state.loading = false;
       const extractedReports = action.payload.data?.reports || [];
  
        state.reports = extractedReports;
      })
      .addCase(fetchMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Reports in Slice:", state.reports);
      })
      
      
  },
});

export const { updateField, resetForm, setSelectedReport } =
  reportsSlice.actions;
export default reportsSlice.reducer;
