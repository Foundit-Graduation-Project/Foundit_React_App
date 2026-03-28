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

// Fetch all reports from backend

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async (params, { rejectWithValue }) => {
    try {
      return await reportsAPI.getAllReports(params);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch reports");
    }
  },
);


// Get Report using Id

export const fetchReportById = createAsyncThunk(
  "report/fetchReportById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getReportById(id); // تأكدي من وجودها في ملف API
      return response.data.report; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching report");
    }
  }
);


//Delete Report
export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      await reportsAPI.deleteReport(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete report");
    }
  }
);
export const reportsSlice = createSlice({
  name: "report",
  initialState: {
    formData: {
      itemName: "",
      category: "",
      subCategory: "",
      date: "",
      location: "",
      description: "",
      brand: "",
      color: "",
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
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    resetForm: (state) => {
      state.formData = {
        itemName: "",
        category: "",
        subCategory: "",
        date: "",
        location: "",
        description: "",
        brand: "",
        color: "",
        images: [],
      };
      state.error = null;
      state.progress = 0;
    },
    clearReportError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE REPORT
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        const newReport = action.payload.data?.report || action.payload.report;
        if (newReport) {
          if (!Array.isArray(state.reports)) state.reports = [];
          state.reports.unshift(newReport);
        }
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // FETCH ALL REPORTS (Home Feed)
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data?.reports || action.payload.reports || [];
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // FETCH MY REPORTS
      .addCase(fetchMyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data?.reports || [];
      })
      .addCase(fetchMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // FETCH BY ID
      .addCase(fetchReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReport = action.payload.data?.report || action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetForm, setSelectedReport, clearReportError } =
  reportsSlice.actions;
export default reportsSlice.reducer;
