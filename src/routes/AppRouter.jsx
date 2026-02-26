import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../components/layout/MainLayout";

// Public Routes
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import ReportDetails from "../pages/Reports/ReportDetails";
import GetStart from "../pages/Start/GetStart";

// Auth Routes
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount";

// Protected Routes
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
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="report/:id" element={<ReportDetails />} />
          <Route path="get-start" element={<GetStart />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomeFeed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="create-report" element={<CreateReport />} />
          <Route path="payment/checkout" element={<PaymentCheckout />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
