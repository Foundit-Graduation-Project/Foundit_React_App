import { BrowserRouter, Routes, Route } from "react-router-dom";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Layouts
import MainLayout from "../components/layout/MainLayout";

// Public Pages
import GetStart from "../pages/Start/GetStart";
import NotFound from "../pages/NotFound/NotFound";
import ReportDetails from "../pages/Reports/ReportDetails";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount";

// Protected Pages
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Chat from "../pages/Chat/Chat";
import Notifications from "../pages/Notifications/Notifications";
import MyReports from "../pages/Reports/MyReports";
import CreateReport from "../pages/Reports/CreateReport";
import PaymentCheckout from "../pages/Payment/PaymentCheckout";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import HomeFeed from "../pages/HomeFeed/HomeFeed";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. Completely Open Routes (Accessible by Anyone) --- */}
        <Route path="/" element={<GetStart />} /> {/* Landing Page */}
        <Route path="/report/:id" element={<ReportDetails />} /> {/* Public Report View */}

        {/* --- 2. Public/Guest Only Routes --- */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* --- 2.5 Neutral Routes (Accessible by anyone in transition) --- */}
        <Route path="/verify-account" element={<VerifyAccount />} />

        {/* --- 3. Protected Routes (Must be logged in) --- */}
        <Route element={<ProtectedRoute />}>
          {/* We nest the MainLayout inside the ProtectedRoute so the layout only shows to authenticated users */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomeFeed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/my-reports/:id" element={<ReportDetails />} />
            <Route path="/create-report" element={<CreateReport />} />

            {/* Payment pages */}
            <Route path="/payment/checkout" element={<PaymentCheckout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
          </Route>
        </Route>

        {/* --- 4. 404 Route --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;