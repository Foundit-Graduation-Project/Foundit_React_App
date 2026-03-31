import { Search, Plus, User, Bell, Settings as SettingsIcon, LogOut, Sun, Moon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"; // Adjust path if needed
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
    const [isDark, setIsDark] = useState(false);
    const unreadCount = useSelector(selectUnreadCount);

    // --- Hooks ---
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get real user from Redux (fallback to empty object to prevent errors if null)
    const currentUser = useSelector(selectCurrentUser) || {};

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle("dark");
        setIsDark(!isDark);
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
                <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200 dark:shadow-none transition-shadow">
                    <Search className="w-5 h-5" />
                </div>

                {/* Brand Name */}
                <span className="font-bold text-xl text-blue-600 tracking-tight dark:text-blue-400 mr-4">
                    FoundIt
                </span>

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
            <div className="flex items-center gap-5 shrink-0">

                {/* Post Button */}
                {location.pathname === "/home" && (
                    <Link to="/create-report" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-lg shadow-md shadow-blue-600/20 transition-transform active:scale-95 flex items-center justify-center">
                        <Plus className="w-4 h-4 mr-2 stroke-[3px]" /> Post a Report
                    </Link>
                )}

                {/* Vertical Separator & Icons */}
                {location.pathname === "/home" && (
                    <>
                        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                        {/* Dynamic Notification Bell */}
                        <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
                            <Bell className="w-5 h-5" />

                            {/* Only show the badge if there are unread notifications */}
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white dark:border-slate-950">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </>
                )}

                {/* User Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            <div className="hidden sm:flex flex-col items-end">
                                {/* Real User Name */}
                                <span className="text-sm font-semibold leading-tight text-slate-900 dark:text-white transition-colors">
                                    {currentUser.name?.split(' ')[0] || "User"}
                                </span>
                                {/* Real User Role */}
                                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize transition-colors">
                                    {currentUser.role?.replace('_', ' ') || "Member"}
                                </span>
                            </div>
                            <Avatar className="w-9 h-9 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
                                {/* Real User Avatar */}
                                <AvatarImage src={currentUser.avatar?.url} alt={currentUser.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                    {getInitials(currentUser.name)}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none text-slate-900 dark:text-white transition-colors">{currentUser.name}</p>
                                <p className="text-xs leading-none text-slate-500">{currentUser.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link to="/profile" className="flex items-center w-full">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link to="/settings" className="flex items-center w-full">
                                    <SettingsIcon className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link to="/notifications" className="flex items-center w-full">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notifications</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        {/* LOGOUT BUTTON ACTION ADDED HERE */}
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                            <LogOut className="mr-2 h-4 w-4" /><span>Log out</span>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </>
    );
};

export default HomeNav; // Updated export