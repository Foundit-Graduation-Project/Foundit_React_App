import { useEffect, useState } from "react";
import {
  BarChart3, Calendar, Award, Wallet, FileText,
  Settings, CreditCard, Sun, Moon, ChevronDown, Globe, Loader2, Info, AlertCircle, Search, Megaphone, MessageSquare
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/axios";

// UI Components
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Progress } from "../../components/ui/progress";
import { AppSidebar } from "../../components/notifications/SideBar";

// --- Redux Imports ---
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserLoading, getMe } from "../../features/user";
import { selectAllNotifications, fetchNotifications } from "../../features/notifications";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const notifications = useSelector(selectAllNotifications) || [];

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchParams, setSearchParams] = useSearchParams();

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: document.documentElement.classList.contains("dark"),
    language: "en",
  });

  // Verify Stripe Session if present in URL
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log("[Stripe] Detected session_id in URL:", sessionId);
    
    if (sessionId) {
      const verifyPayment = async () => {
        try {
          console.log("[Stripe] Starting manual verification for session:", sessionId);
          const response = await api.get(`/payments/confirm-payment?session_id=${sessionId}`);
          console.log("[Stripe] Verification response from server:", response.data);
          
          if (response.data?.status === 'success' || response.data?.message?.includes('verified')) {
            toast.success("Payment verified! Your credits have been updated.");
            dispatch(getMe()); 
          }
        } catch (error) {
          console.error("[Stripe] Payment verification failed error:", error);
          toast.error("Could not verify payment automatically. Please check your balance in a moment.");
        } finally {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('session_id');
          setSearchParams(newParams, { replace: true });
        }
      };
      verifyPayment();
    }
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    dispatch(getMe());
    if (notifications.length === 0) {
      dispatch(fetchNotifications(1));
    }
  }, [dispatch]);

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const getActivityIcon = (category) => {
    switch (category) {
      case 'MATCH': return <Search className="w-5 h-5" />;
      case 'MESSAGE': return <MessageSquare className="w-5 h-5" />;
      case 'ALERT': return <Megaphone className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getActivityColor = (category) => {
    switch (category) {
      case 'MATCH': return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
      case 'MESSAGE': return "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400";
      case 'ALERT': return "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const toggleLanguage = () => {
    setSettings((prev) => ({
      ...prev,
      language: prev.language === "en" ? "ar" : "en"
    }));
  };

  // --- Dynamic Data Helpers ---
  const accountAge = user?.createdAt
    ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: false })
    : "New Account";

  // --- NEW CREDIT LOGIC ---
  const currentCredits = user?.credits || 0;
  // If plan is Premium, capacity is 10. Otherwise (Free/Basic), capacity is 3.
  const MAX_CREDITS = user?.plan === 'Premium' ? 10 : 3;

  // Calculate how full the bar should be (cap at 100% just in case they over-bought)
  const remainingPercentage = Math.min(Math.round((currentCredits / MAX_CREDITS) * 100), 100);
  const isOutOfCredits = currentCredits === 0;

  if (!user && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      <div className="sticky top-0 h-screen w-64 shrink-0 dark:border-slate-800 dark:bg-slate-950 z-10 transition-colors duration-300">
        <AppSidebar
          collapsed={collapsed}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      <main className="flex-1 p-8 transition-colors duration-300 w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Manage your account settings and monitor resource usage.
          </p>
        </div>

        {/* --- Top Row: Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Trust Score</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.trustScore ?? 100}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Activity Score</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.activityScore ?? 0}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Member Since</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                  {accountAge}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Current Plan</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.plan || "Free"}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Middle Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-8">

            {/* --- UPDATED CREDIT MANAGEMENT CARD --- */}
            <Card className={`border shadow-sm p-6 transition-colors ${isOutOfCredits
              ? 'border-red-200 bg-red-50/30 dark:border-red-900/50 dark:bg-red-950/20'
              : 'border-gray-200 dark:border-slate-800 dark:bg-slate-900'
              }`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Wallet className={`w-5 h-5 ${isOutOfCredits ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`} />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Credit Balance</h3>
                </div>
                <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  Lifetime Credits
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Available to post
                    </span>
                    <span className={`font-bold ${isOutOfCredits ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
                      {remainingPercentage}% Remaining
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-4xl font-bold ${isOutOfCredits ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                      {currentCredits}
                    </span>
                    <span className="text-xl text-gray-400 dark:text-slate-500 font-medium">/ {MAX_CREDITS}</span>
                  </div>

                  {/* Progress Bar (Turns Red if empty) */}
                  <Progress
                    value={remainingPercentage}
                    className={`h-2 ${isOutOfCredits ? 'bg-red-200 dark:bg-red-900/50' : 'bg-gray-100 dark:bg-slate-800'}`}
                    indicatorColor={isOutOfCredits ? 'bg-red-500' : 'bg-blue-600'}
                  />

                  {/* Dynamic Helper Text */}
                  {isOutOfCredits ? (
                    <p className="text-xs text-red-500 mt-3 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> You are out of credits! Refill your balance to post new reports.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-3 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Credits do not expire. Use them whenever you need.
                    </p>
                  )}
                </div>

                <Link to="/payment/checkout">
                  <Button className={`h-12 px-6 shadow-lg transition-all ${isOutOfCredits
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200 dark:shadow-none text-white animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none text-white'
                    }`}>
                    Refill Credits
                  </Button>
                </Link>
              </div>
            </Card>

            {/* --- BADGES CARD --- */}
            <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors mt-8">
              <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Achievement Badges
                </h3>
              </div>
              <div className="p-6">
                {user?.badges && user.badges.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                      >
                        <Award className="w-4 h-4" />
                        {badge}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      No badges earned yet. Keep participating to unlock achievements!
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors mt-8">
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Activity</h3>
                <Link to="/notifications">
                  <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-8 px-3 text-xs">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="p-0">
                {notifications.length > 0 ? (
                  // Show only the 3 most recent notifications
                  notifications.slice(0, 3).map((notif) => (
                    <div key={notif._id} className="flex items-start gap-4 p-6 border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition last:border-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getActivityColor(notif.category)}`}>
                        {getActivityIcon(notif.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">{notif.title}</h4>
                        <p
                          className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: notif.message }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-slate-500 shrink-0">
                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  ))
                ) : (
                  // Fallback if no activity yet
                  <div className="p-8 text-center text-gray-500 dark:text-slate-400 text-sm">
                    No recent activity. Start by creating a report!
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Quick Settings */}
          <div className="lg:col-span-1 h-fit">
            <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm h-full transition-colors">
              <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Quick Settings</h3>
              </div>
              <div className="p-6 space-y-6">

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Appearance</label>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {settings.darkMode ? "Dark mode active" : "Light mode active"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full transition-all duration-300 bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-transparent dark:border-slate-700 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:border-blue-800 dark:hover:bg-blue-900/20"
                  >
                    {settings.darkMode ? <Moon className="h-5 w-5 fill-current" /> : <Sun className="h-5 w-5 fill-current" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Language</label>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {settings.language === "en" ? "English (US)" : "Arabic (EG)"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={toggleLanguage}
                    className="h-9 px-3 rounded-full border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-bold text-xs uppercase">{settings.language}</span>
                  </Button>
                </div>

                <div className="pt-4">
                  <Link to="/settings">
                    <Button variant="outline" className="w-full border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 h-10">
                      View Full Settings
                    </Button>
                  </Link>
                </div>

              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;