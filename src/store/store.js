
import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "../features/reports/reportsSlice";
import chatReducer from '../features/chat/chatSlice';
import settingsReducer from '../features/settings/settingSlice';
import authReducer from "../features/auth";
import paymentReducer from "../features/payment/paymentSlice";
import notificationsReducer from "../features/notifications";
export const store = configureStore({
  reducer: {
    report: reportReducer,
    chat: chatReducer,
    settings: settingsReducer,
    auth: authReducer,
    payment: paymentReducer,
    notifications: notificationsReducer
  },
});

