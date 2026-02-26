import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../components/layout/MainLayout";

// Public Pages
import GetStart from "../pages/Start/GetStart";
// import Home from "../pages/Home"; // (Assuming GetStart IS your home/landing page now)
import NotFound from "../pages/NotFound/NotFound";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
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
import ReportDetails from "../pages/Reports/ReportDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. Public Routes (No Layout or Simple Layout) --- */}
        <Route path="/" element={<GetStart />} /> {/* Landing Page */}

        {/* Auth Routes (Standalone Pages) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />

        {/* Public Report View (Standalone) */}
        <Route path="/report/:id" element={<ReportDetails />} />

        {/* --- 2. Protected Routes (Wrapped in MainLayout) --- */}
        {/* This adds the Sidebar/Navbar to all these pages automatically */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomeFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-reports" element={<MyReports />} />      
          <Route path="/my-reports/:id" element={<ReportDetails />} />      
          <Route path="/create-report" element={<CreateReport />} />

          {/* Payment pages might need a simpler layout, but MainLayout is fine for now */}
          <Route path="/payment/checkout" element={<PaymentCheckout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>

        {/* --- 3. 404 Route --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;