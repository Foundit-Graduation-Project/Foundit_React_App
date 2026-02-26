import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
  name: "report",
  initialState: {
    formData: {
      location: "",
      itemName: "",
      category: "",
      subCategory: "",
      date: "",
      description: "",
    },
    progress: 0,
    selectedReport: null,

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
        location: "",
        description: "",
      };
      state.progress = 0;
    },
    setSelectedReport: (state, action) => {
    state.selectedReport = action.payload;
    },
  },
});

export const { updateField, resetForm,setSelectedReport } = reportsSlice.actions;
export default reportsSlice.reducer;
