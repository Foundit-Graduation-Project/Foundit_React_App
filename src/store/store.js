import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "../features/reports/reportsSlice";
import chatReducer from '../features/chat/chatSlice';
export const store = configureStore({
  reducer: {
    report: reportReducer,
    chat: chatReducer,
  },
});

