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
      const response = await reportsAPI.getReportById(id); 
      return response.data.report; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching report");
    }
  }
);


export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      await reportsAPI.deleteReport(id);
      // The backend now returns { status: 'success', data: { reports, total } }
      // return response.data?.reports || []; 
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
    deleteLoading: false,
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
    setSelectedReport: (state, action) => {
    state.selectedReport = action.payload;
    },
  },
});

export const { updateField, resetForm,setSelectedReport } = reportsSlice.actions;
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
      state.reports = action.payload.data?.reports || action.payload.reports || action.payload ||[];
        // 1. Isolate the 'data' part of the JSend response
        const responseData = action.payload?.data;

        // 2. Smart Extraction
        if (Array.isArray(responseData)) {
          // Scenario A: Redis Cache (data is directly the array)
          state.reports = responseData;
        } else if (responseData && Array.isArray(responseData.reports)) {
          // Scenario B: MongoDB (data is an object containing { reports:[] })
          state.reports = responseData.reports;
        } else {
          // Fallback just in case
          state.reports = [];
        }
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
        state.deleteLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.reports = state.reports.filter((r) => r._id !== action.payload);
        if(state.pagination){
          state.pagination.total = state.pagination.total - 1;
        }
        // state.reports = action.payload;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.deleteLoading = false;
        // state.error = action.payload;
      });
  },
});

export const { updateField, resetForm, setSelectedReport, clearReportError } =
  reportsSlice.actions;
export default reportsSlice.reducer;
