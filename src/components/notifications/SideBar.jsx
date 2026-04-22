import { BookOpen, User, FileText, Mail, Bell, Settings, Home, Search, CircleUserRound, PlusCircleIcon, MessageCircleMoreIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Ensure AvatarImage is imported
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// --- Redux Integration ---
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUser } from "../../features/auth"; // Adjust path to your auth barrel file

const NAV_ITEMS = [
  { label: "Profile", path: "/profile", icon: <CircleUserRound className="w-4.5 h-4.5" /> },
  { label: "Home", path: "/home", icon: <Home className="w-4.5 h-4.5" /> },
  { label: "Create Report", path: "/create-report", icon: <PlusCircleIcon className="w-4.5 h-4.5" /> },
  { label: "My Reports", path: "/my-reports", icon: <FileText className="w-4.5 h-4.5" /> },
  { label: "Chat", path: "/chat", icon: <MessageCircleMoreIcon className="w-4.5 h-4.5" /> },
  { label: "Notifications", path: "/notifications", icon: <Bell className="w-4.5 h-4.5" /> },
  { label: "Settings", path: "/settings", icon: <Settings className="w-4.5 h-4.5" /> },
  { label: "Logout", path: "/login", icon: <LogOut className="w-4.5 h-4.5" /> },
];

export function AppSidebar({ collapsed, isMobile, mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  // --- Get Real User Data from Redux ---
  const currentUser = useSelector(selectCurrentUser) || {};
  const dispatch = useDispatch();

  // Helper for Initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

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

  const sidebarBase =
    "flex flex-col h-screen bg-card border-r border-border shrink-0 overflow-hidden z-[100] transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
  const desktopWidth = collapsed ? "w-[68px] min-w-[68px]" : "w-[240px] min-w-[240px]";

  const SidebarInner = () => (
    <>
      {/* Header / Logo Area */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-5 overflow-hidden shrink-0">
        <div className="bg-blue-600 w-9 h-9 min-w-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
          <Search className="w-5 h-5" />
        </div>
        <div className={`overflow-hidden whitespace-nowrap transition-all duration-220 ${collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"}`}>
          <h2 className="text-[15px] font-bold tracking-tight leading-tight dark:text-white">FoundIt</h2>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative group">
            <NavLink
              to={item.path}
              onClick={(e) => {
                if (item.label === "Logout") {
                  e.preventDefault();
                  handleLogout();
                }
                if (isMobile) onClose();
              }}
              className={() =>
                `flex items-center gap-3 px-2 py-2 rounded-md text-[13.5px] font-medium whitespace-nowrap transition-colors duration-220 ${collapsed && !isMobile ? "justify-center" : ""
                } ${location.pathname.startsWith(item.path) // Use startsWith to keep it active on nested routes!
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span className={`overflow-hidden transition-all duration-220 ${collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"}`}>
                {item.label}
              </span>
            </NavLink>
          </div>
        ))}
      </nav>

      {/* User Footer (DYNAMIC REDUX DATA) */}
      <div className="p-3 border-t border-border shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-lg bg-secondary/50 overflow-hidden ${collapsed && !isMobile ? "justify-center" : ""}`}>
          <Avatar className="w-8 h-8 shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Real Avatar Image */}
            <AvatarImage src={currentUser?.avatar?.url} alt={currentUser?.name} className="object-cover" />

            {/* Real Initials Fallback */}
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold">
              {getInitials(currentUser?.name)}
            </AvatarFallback>
          </Avatar>

          <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-220 ${collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"}`}>
            {/* Real Name */}
            <span className="text-[13px] font-semibold dark:text-white truncate">
              {currentUser?.name || "Guest User"}
            </span>
            {/* Real Role / Plan */}
            <span className="text-[11px] text-muted-foreground capitalize truncate">
              {currentUser?.role?.replace('_', ' ') || "Member"}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <div
          onClick={onClose}
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-90 transition-opacity duration-220 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        />
        <aside className={`fixed left-0 top-0 ${sidebarBase} w-60 min-w-60 shadow-xl ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <SidebarInner />
        </aside>
      </>
    );
  }

  return (
    <aside className={`${sidebarBase} ${desktopWidth}`}>
      <SidebarInner />
    </aside>
  );
}