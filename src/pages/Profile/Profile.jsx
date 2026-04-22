import { useEffect, useState } from "react";
import {
  BarChart3, Calendar, Award, Wallet, FileText,
  Settings, CreditCard, RefreshCw, Sun, Moon, ChevronDown, Globe
} from "lucide-react";

// 1. Import UI Components
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Progress } from "../../components/ui/progress";
import { AppSidebar } from "../../components/notifications/SideBar";
import { Link } from "react-router-dom";

const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // State
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
  });

  // Handle Resize
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

  // Handle Theme Toggle
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark"); // Adds 'dark' class to <html>
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleLanguage = () => {
    setSettings((prev) => ({
      ...prev,
      language: prev.language === "en" ? "ar" : "en"
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      {/* --- Sidebar (Sticky) --- */}
      <div className="sticky top-0 h-screen w-64 shrink-0  dark:border-slate-800 dark:bg-slate-950 z-10 transition-colors duration-300">
        <AppSidebar
          collapsed={collapsed}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 transition-colors duration-300">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Profile</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Manage your account settings and monitor resource usage.
          </p>
        </div>

        {/* --- Top Row: Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Card 1 */}
          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center 
                            bg-blue-50 text-blue-600 
                            dark:bg-blue-900/20 dark:text-blue-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Total Reports</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center 
                            bg-green-50 text-green-600 
                            dark:bg-green-900/20 dark:text-green-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Account Age</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">14 Months</h3>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center 
                            bg-orange-50 text-orange-600 
                            dark:bg-orange-900/20 dark:text-orange-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Current Plan</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Premium Plus</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Middle Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Credit Management */}
            <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm p-6 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Credit Management</h3>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full 
                               dark:bg-blue-900/30 dark:text-blue-300">
                  Monthly Quota
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wider">Remaining Reports</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">66% Used</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">2</span>
                    <span className="text-xl text-gray-400 dark:text-slate-500 font-medium">/ 3</span>
                  </div>

                  {/* Progress Bar with Dark Mode */}
                  <Progress value={66} className="h-2 bg-gray-100 dark:bg-slate-800" />

                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Credits reset on the 1st of every month.
                  </p>
                </div>

                <Link to="/payment/checkout">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 shadow-lg shadow-blue-200 dark:shadow-none">
                    Refill Credits
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="border-gray-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-colors">

              {/* Header: "View All" Removed */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Activity Feed</h3>
              </div>

              <div className="p-0">
                {/* Activity Item 1 */}
                <div className="flex items-start gap-4 p-6 border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0
                                bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Generated SEO Audit Report</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Project: Alpha Marketing Campaign</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-slate-500">2 hours ago</span>
                </div>

                {/* Activity Item 2 */}
                <div className="flex items-start gap-4 p-6 border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0
                                bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Security Settings Updated</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Two-factor authentication enabled successfully.</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-slate-500">1 day ago</span>
                </div>

                {/* Activity Item 3 */}
                <div className="flex items-start gap-4 p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0
                                bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Subscription Renewed</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Invoice #INV-2024-001 has been paid.</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-slate-500">3 days ago</span>
                </div>

                {/* New "Load More" Footer */}
                <div className="mt-2 text-center pb-8 border-t border-gray-50 dark:border-slate-800 pt-6">
                  <Button variant="ghost" className="text-[13px] text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Load older feeds <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>

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

                {/* Toggle 1: Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Notifications</label>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Weekly usage reports</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(v) => setSettings({ ...settings, notifications: v })}
                    className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                  />
                </div>

                {/* Toggle 2: Appearance (Dark Mode) */}
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
                    className="rounded-full transition-all duration-300
                     bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900
                     dark:bg-transparent dark:border-slate-700 dark:text-slate-400 
                     dark:hover:text-blue-400 dark:hover:border-blue-800
                     dark:hover:bg-blue-900/20"
                  >
                    {settings.darkMode ? (
                      <Moon className="h-5 w-5 fill-current" />
                    ) : (
                      <Sun className="h-5 w-5 fill-current" />
                    )}
                  </Button>
                </div>

                {/* Toggle 3: Language (NEW) */}
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
                    className="h-9 px-3 rounded-full border-gray-200 dark:border-slate-700 
                     text-gray-700 dark:text-slate-300 bg-transparent
                     hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200
                     dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:border-blue-800
                     transition-all duration-300"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-bold text-xs uppercase">{settings.language}</span>
                  </Button>
                </div>

                <div className="pt-4">
                  <Link to="/settings">
                    <Button variant="outline" className="w-full border-gray-200 dark:border-slate-700 
                                         text-gray-700 dark:text-slate-300 
                                         hover:bg-gray-50 dark:hover:bg-slate-800 h-10">
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