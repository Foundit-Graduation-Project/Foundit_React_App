import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
  name: "report",
  initialState: {
    formData: {
      location: "",
    },
    progress: 0,
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
  },
});

export const { updateField, resetForm } = reportsSlice.actions;
export default reportsSlice.reducer;
