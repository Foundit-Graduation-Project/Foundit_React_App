import { useState } from "react";
import { Menu, Sun, Moon, User, Bell, Settings as SettingsIcon, LogOut, MessageSquare, FileText } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUser } from "../../features/auth";
import { selectUnreadCount } from "../../features/notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

export function TopNav({ onToggleSidebar, isMobile, title }) {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser) || {};
  const unreadCount = useSelector(selectUnreadCount);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-background shrink-0 transition-colors duration-300 md:px-6">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand/Title */}
        <div className="flex flex-col">
          {isMobile && !title && (
            <Link to="/home" className="font-bold text-lg text-blue-600 dark:text-blue-400 tracking-tight hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              FoundIt
            </Link>
          )}
          {title && <h1 className="text-sm font-bold md:text-base">{title}</h1>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center outline-none">
              <Avatar className="w-9 h-9 border border-border shadow-sm hover:ring-2 hover:ring-blue-500/20 transition-all active:scale-95 cursor-pointer">
                <AvatarImage src={currentUser?.avatar?.url} alt={currentUser?.name} className="object-cover" />
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[11px] font-bold">
                  {getInitials(currentUser?.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-2xl z-[150]"
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-3 mb-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                  {currentUser.name || "Guest User"}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50" />

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/profile" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/chat" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Messages</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/notifications" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors relative">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
                    )}
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold dark:bg-red-900/50 dark:text-red-400">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/my-reports" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">My Reports</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/settings" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Settings</span>
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
    </div>
  );
}
