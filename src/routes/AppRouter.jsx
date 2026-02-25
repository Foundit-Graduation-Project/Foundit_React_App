import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../components/layout/MainLayout";

// Public Routes
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import ReportDetails from "../pages/Reports/ReportDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

// Auth Routes
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount";

// Protected Routes
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import AccountSecurity from "../pages/Settings/AccountSecurity";
import Personalization from "../pages/Settings/Personalization";
import Chat from "../pages/Chat/Chat";
import Messages from "../pages/Chat/Messages";
import Notifications from "../pages/Notifications/Notifications";
import MyReports from "../pages/Reports/MyReports";
import CreateReport from "../pages/Reports/CreateReport";
import PaymentCheckout from "../pages/Payment/PaymentCheckout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="report/:id" element={<ReportDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account-security" element={<AccountSecurity />} />
          <Route path="personalization" element={<Personalization />} />
          <Route path="chat" element={<Chat />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="create-report" element={<CreateReport />} />
          <Route path="payment/checkout" element={<PaymentCheckout />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
