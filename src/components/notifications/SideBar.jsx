import { BookOpen, User, FileText, Mail, Bell, Settings, Home } from "lucide-react"; // LayoutDashboard commented out as per your code
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink, useLocation } from "react-router-dom"; // 1. Import NavLink

const NAV_ITEMS = [
  { label: "Home",          path: "/home",          icon: <Home className="w-4.5 h-4.5" /> },
  { label: "My Reports",    path: "/my-reports",    icon: <FileText className="w-4.5 h-4.5" /> },
  { label: "Messages",      path: "/chat",          icon: <Mail className="w-4.5 h-4.5" /> },
  { label: "Notifications", path: "/notifications", icon: <Bell className="w-4.5 h-4.5" /> },
  { label: "Settings",      path: "/settings",      icon: <Settings className="w-4.5 h-4.5" /> },
];

export function AppSidebar({ collapsed, isMobile, mobileOpen, onClose }) {
  const location = useLocation();
  const sidebarBase =
    "flex flex-col h-screen bg-card border-r border-border shrink-0 overflow-hidden z-[100] transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
  const desktopWidth = collapsed ? "w-[68px] min-w-[68px]" : "w-[240px] min-w-[240px]";

  const SidebarInner = () => (
    <>
      {/* Header / Logo Area */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-5 overflow-hidden shrink-0">
        <div className="w-9 h-9 min-w-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className={`overflow-hidden whitespace-nowrap transition-all duration-220 ${collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"}`}>
          <h2 className="text-[15px] font-bold tracking-tight leading-tight dark:text-white">Lost & Found</h2>
          <span className="text-[11px] text-muted-foreground">Portal v2.4</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => (

          <div key={item.label} className="relative group">
            <NavLink
              to={item.path}
              onClick={() => isMobile && onClose()} // Close sidebar on mobile when clicked
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-md text-[13.5px] font-medium whitespace-nowrap transition-colors duration-220 ${
                  collapsed && !isMobile ? "justify-center" : ""
                } ${
                  location.pathname === item.path
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

      <div className="p-3 border-t border-border shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-lg bg-secondary/50 overflow-hidden ${collapsed && !isMobile ? "justify-center" : ""}`}>
          <Avatar className="w-8 h-8 shrink-0 bg-linear-to-br from-indigo-500 to-purple-600">
            <AvatarFallback className="text-white text-xs bg-transparent">AT</AvatarFallback>
          </Avatar>
          <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-220 ${collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"}`}>
            <span className="text-[13px] font-semibold dark:text-white">Alex Thompson</span>
            <span className="text-[11px] text-muted-foreground">Premium Member</span>
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