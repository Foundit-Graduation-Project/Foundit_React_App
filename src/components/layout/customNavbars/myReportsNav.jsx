import SearchBar from "../../../components/common/SearchBar";
import { Search, Plus, User, Settings as SettingsIcon, Bell, MessageSquare, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../../../features/auth";
import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { useState } from "react";


const myReportsNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(selectCurrentUser) || {};

    const isMyReportsPage = location.pathname === "/my-reports";
    const isReportDetailsPage = location.pathname.startsWith("/report") || location.pathname.startsWith("/my-reports/");
    const navReportLabel = isMyReportsPage ? "Notifications" : "Reports";
    const navReportPath = isMyReportsPage ? "/notifications" : "/my-reports";
    const showSearch = isMyReportsPage;

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name.substring(0, 2).toUpperCase();
    };
    return (
        <>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <Link to="/home" className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md hover:bg-blue-700 transition-colors">
                        <Search className="w-5 h-5" />
                    </Link>
                    <Link to="/home" className="font-bold text-lg text-gray-900 tracking-tight hover:text-blue-600 transition-colors">
                        FoundIt
                    </Link>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <Link to="/home">
                        <span className=" text-gray-500 hover:text-blue-600 
                                 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            Home
                        </span>
                    </Link>
                    <Link to={navReportPath}>
                        <span className=" text-gray-500 hover:text-blue-600 
                                 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            {navReportLabel}
                        </span>
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                {showSearch && (
                    <div className="hidden md:block w-64 mr-2">
                        <SearchBar placeholder="Search reports..." className="w-full" />
                    </div>
                )}
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="/create-report" className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" /> New Report
                    </Link>
                </Button>
                {/* User Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:bg-slate-50 p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold leading-tight text-slate-900">{currentUser.name}</span>
                                <span className="text-xs text-slate-500">{currentUser.role}</span>
                            </div>
                            <Avatar className="w-9 h-9 border border-slate-100 shadow-sm">
                                <AvatarImage src={currentUser.avatar?.url} alt={currentUser.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
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
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{currentUser.name}</p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50" />

                        <DropdownMenuGroup className="space-y-1">
                            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group" asChild>
                                <Link to="/profile">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Profile</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group" asChild>
                                <Link to="/chat">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Messages</span>
                                </Link>
                            </DropdownMenuItem>

                            {!isMyReportsPage && (
                                <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group" asChild>
                                    <Link to="/notifications">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                                    </Link>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>

                        <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group" asChild>
                            <Link to="/settings">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                                    <SettingsIcon className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">Settings</span>
                            </Link>
                        </DropdownMenuItem>
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

export default myReportsNav;