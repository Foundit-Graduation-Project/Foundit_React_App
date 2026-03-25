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
       // FETCH REPORTS
       .addCase(fetchReports.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchReports.fulfilled, (state, action) => {
    state.loading = false;
 
    const extracted = action.payload.data?.reports || action.payload.reports || [];
    state.reports = extracted; 
})
.addCase(fetchReports.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
})
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
      }).addCase(fetchReportById.pending, (state) => {
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
// Delete
.addCase(deleteReport.pending, (state) => {
    state.loading = true;
  })
  .addCase(deleteReport.fulfilled, (state, action) => {
    state.loading = false;

    state.reports = state.reports.filter((report) => report._id !== action.payload);
  })
  .addCase(deleteReport.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});

export const { updateField, resetForm, setSelectedReport } =
  reportsSlice.actions;
export default reportsSlice.reducer;
