import {
  Search,
  Plus,
  User,
  Bell,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon,
  MessageSquare,
  FileText,
  Info,
} from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar"; // Adjust path if needed
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useLocation & useNavigate
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectUnreadCount } from "../../../features/notifications"; // Adjust path to your barrel file
import { useState } from "react";
import SearchBar from "../../../components/common/SearchBar";

// --- Integration Imports ---
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../../../features/auth";
import toast from "react-hot-toast";

// Changed to Capital H (React requirement for components)
const HomeNav = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("foundit-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      return true;
    }
    document.documentElement.classList.remove("dark");
    return false;
  });
  const unreadCount = useSelector(selectUnreadCount);

  // --- Hooks ---
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get real user from Redux (fallback to empty object to prevent errors if null)
  const currentUser = useSelector(selectCurrentUser) || {};

  const toggleTheme = () => {
    const newIsDark = !isDark;
    const root = document.documentElement;
    if (newIsDark) {
      root.classList.add("dark");
      localStorage.setItem("foundit-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("foundit-theme", "light");
    }
    setIsDark(newIsDark);
  };

  // --- Logout Handler ---
  const handleLogout = async () => {
    try {
      // unwrap() allows us to catch the error thrown by createAsyncThunk if it fails
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Helper to get initials safely
  const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* 1. LEFT: Logo */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Logo Icon */}
        <Link
          to="/home"
          className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </Link>

        {/* Brand Name - Hidden on mobile/tablet to save space */}
        <Link
          to="/home"
          className="font-bold text-lg sm:text-xl text-blue-600 tracking-tight dark:text-blue-400 mr-2 sm:mr-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors hidden md:block"
        >
          FoundIt
        </Link>

        {/* Conditional Home Text Link */}
        {location.pathname === "/create-report" && (
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link to="/home">
              <span className=" text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Home
              </span>
            </Link>
            <Link to="/my-reports">
              <span className=" text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Reports
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* 2. CENTER: Search Bar */}
      {location.pathname === "/home" && (
        <div className="hidden md:flex flex-1 max-w-2xl px-4">
          <SearchBar placeholder="Search for reports..." className="w-full" />
        </div>
      )}

      {/* 3. RIGHT: Actions */}
      <div className="flex items-center gap-2 sm:gap-5 shrink-0">
        {/* Post Button - Shortened on mobile to prevent overflow */}
        {location.pathname === "/home" && (
          <Link
            to="/create-report"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-3 sm:px-4 rounded-lg shadow-md shadow-blue-600/20 transition-transform active:scale-95 flex items-center justify-center shrink-0"
          >
            <Plus className="w-4 h-4 sm:mr-2 stroke-[3px]" />
            <span className="hidden sm:inline">Post<span className="hidden md:inline"> a Report</span></span>
          </Link>
        )}

        {/* Vertical Separator & Icons */}
        {location.pathname === "/home" && (
          <>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Dynamic Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />

              {/* Only show the badge if there are unread notifications */}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white dark:border-slate-950">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </>
        )}

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="hidden lg:flex flex-col items-end">
                {/* Real User Name */}
                <span className="text-sm font-semibold leading-tight text-slate-900 dark:text-white transition-colors">
                  {currentUser.name?.split(" ")[0] || "User"}
                </span>
                {/* Real User Role */}
                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize transition-colors">
                  {currentUser.role?.replace("_", " ") || "Member"}
                </span>
              </div>
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
                {/* Real User Avatar */}
                <AvatarImage
                  src={currentUser.avatar?.url}
                  alt={currentUser.name}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xs">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-200 z-50"
            align="end"
            sideOffset={10}
            forceMount
          >
            <DropdownMenuLabel className="p-3 mb-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                  {currentUser.name}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50" />

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                asChild
              >
                <Link to="/profile">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Profile
                  </span>
                </Link>
              </DropdownMenuItem>

              {/* Messages and Notifications - Show on Home and Create Report */}
              {(location.pathname === "/home" ||
                location.pathname === "/create-report") && (
                  <>
                    <DropdownMenuItem
                      className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                      asChild
                    >
                      <Link to="/chat">
                        <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          Messages
                        </span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                      asChild
                    >
                      <Link to="/notifications">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors relative">
                          <Bell className="w-4 h-4" />
                          {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
                          )}
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            Notifications
                          </span>
                          {unreadCount > 0 && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold dark:bg-red-900/50 dark:text-red-400">
                              {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

              {/* My Reports - Show only on Home */}
              {location.pathname === "/home" && (
                <DropdownMenuItem
                  className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                  asChild
                >
                  <Link to="/my-reports">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      My Reports
                    </span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                asChild
              >
                <Link to="/">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                    <Info className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    About Us
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
                asChild
              >
                <Link to="/settings">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Settings
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50 my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-semibold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default HomeNav; // Updated export
