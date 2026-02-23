
import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "../features/reports/reportsSlice";
export const store = configureStore({
  reducer: {
    report: reportReducer,
  },
});
