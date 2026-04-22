import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReports } from "../../features/reports/reportsSlice";
import { reportsAPI } from "../../features/reports/reportsAPI";
import { Search, Loader2, Smartphone, PawPrint, Wallet, FileText, Users, ChevronLeft, ChevronRight, Key, Box, Heart, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import Nav from "../../components/layout/customNavbars/homeNav";
import ReportCard from "../Reports/reportCard";
import { fetchMyMatches } from "@/features/matches/matchesSlice";
import { useSearchParams } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { SortAsc } from "lucide-react";
import { formatDistanceToNow } from "date-fns";


const CATEGORIES = [
    { name: "All Items", value: "" },
    { name: "Electronics", value: "Electronics", icon: Smartphone },
    { name: "Accessories", value: "Accessories", icon: Wallet }

];

const PAGE_LIMIT = 9;

const HomeFeed = () => {
    // Helper to resolve backend image URLs
    const getImageUrl = (url) => {
        if (!url) return 'https://placehold.jp/100x100.png';
        if (url.startsWith('http')) return url;
        const BASE_URL = 'http://localhost:3001';
        return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const dispatch = useDispatch();
    const { reports, loading } = useSelector((state) => state.report);
    // 1. Get current user to compare IDs
    const { user } = useSelector((state) => state.auth);
    const currentUserId = user?._id;
    const { matches, loading: matchesLoading } = useSelector((state) => state.match);
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [stats, setStats] = useState(null);
    const [dateRange, setDateRange] = useState("anytime");

    // Search from URL
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    // State for sorting: stores both label for UI and value for API
    const [sortConfig, setSortConfig] = useState({
        label: "Newest First",
        value: "-createdAt"
    });
    useEffect(() => {
        const params = {
            page,
            limit: PAGE_LIMIT,
            sort: sortConfig.value,
            keyword: searchTerm,
            ...(type && { type }),
            ...(category && { category }),
            ...(dateRange !== "anytime" && { dateRange })
        };
        dispatch(fetchReports(params));
        if (user) {
            dispatch(fetchMyMatches());
        }
        console.log(sortConfig);
    }, [dispatch, type, category, page, user, sortConfig.value, dateRange, searchTerm]);

    useEffect(() => {
        reportsAPI.getStats().then(data => {
            if (data?.data) setStats(data.data);
        }).catch(() => { });
    }, []);

    const handleFilterChange = (setter, value) => {
        setter(value);
        setPage(1);
    };
    // Update sort configuration and reset to first page
    const handleSortChange = (label, value) => {
        setSortConfig({ label, value });
        setPage(1);
    };
    // Clear filters
    const handleClearFilters = () => {
        setType("");
        setCategory("");
        setDateRange("anytime");
        setSearchParams({});
        setPage(1);
    };
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 w-full font-sans">
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 w-full h-18 px-6 flex items-center justify-between shadow-sm">
                <Nav />
            </div>

            <div className="w-full px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-15 gap-8 items-start">

                    {/* SIDEBAR LEFT */}
                    <aside className="hidden lg:block lg:col-span-2 sticky top-24 space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Category</h3>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => handleFilterChange(setCategory, cat.value)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${category === cat.value ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                                >
                                    {cat.icon && <cat.icon className="w-4 h-4" />}
                                    {cat.name}
                                </button>
                            ))}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Date Posted</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Anytime", value: "anytime" },
                                        { label: "Last 24 hours", value: "today" },
                                        { label: "Last 7 days", value: "week" },
                                        { label: "Last 30 days", value: "month" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="dateFilter"
                                                checked={dateRange === option.value}
                                                onChange={() => handleFilterChange(setDateRange, option.value)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                            />
                                            <span className={`text-sm ${dateRange === option.value ? "text-blue-700 dark:text-blue-400 font-medium" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"}`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleClearFilters}
                                className="w-full py-6 mt-4 border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 rounded-lg font-bold text-sm transition-colors"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </aside>

                    {/* MAIN FEED */}
                    <main className="lg:col-span-10 space-y-6 min-w-0 w-full overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Recent Reports</h1>
                            {/* Sort Dropdown */}
                            <div className="w-full sm:w-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-auto text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 justify-between sm:justify-start h-10 px-4">
                                            <div className="flex items-center">
                                                <SortAsc className="w-4 h-4 mr-2 opacity-70" />
                                                <span className="text-sm font-medium">Sort: {sortConfig.label}</span>
                                            </div>
                                            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 rounded-xl border-gray-100 dark:border-gray-800 shadow-xl min-w-[160px]">
                                        <DropdownMenuItem
                                            className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-gray-200"
                                            onClick={() => handleSortChange("Newest First", "-createdAt")}
                                        >
                                            Newest First
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-gray-200"
                                            onClick={() => handleSortChange("Oldest First", "createdAt")}
                                        >
                                            Oldest First
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-gray-200"
                                            onClick={() => handleSortChange("Name (A-Z)", "title")}
                                        >
                                            Name (A-Z)
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center">
                                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">Fetching reports...</p>
                                </div>
                            ) : Array.isArray(reports) && reports.length > 0 ? (
                                reports.map((report) => (
                                    <ReportCard
                                        key={report._id}
                                        report={report}
                                        isMyReportView={false}
                                        hideTypeBadge={true}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                                    <Search className="mx-auto w-12 h-12 text-gray-200 dark:text-gray-700 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-400 dark:text-gray-500">No {type} Reports found</h3>
                                </div>
                            )}

                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 mt-8 pb-10">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium h-11 px-6"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button
                                variant="outline"
                                disabled={!reports || reports.length < PAGE_LIMIT}
                                onClick={() => setPage(p => p + 1)}
                                className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium h-11 px-6"
                            >
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
                        {/* Community Impact Card */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                            <h3 className="font-bold text-xs text-gray-400 dark:text-gray-500 uppercase mb-4 tracking-wider">Community Impact</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-green-50 rounded-xl text-green-600 transition-colors group-hover:bg-green-100"><CheckCircle size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {stats ? Math.floor((stats.resolvedReports.toLocaleString() / 2)) : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">Items Returned</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group border-t border-gray-50 dark:border-gray-800 pt-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"><Users size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {stats ? stats.totalMembers.toLocaleString() : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">Active Members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group border-t border-gray-50 dark:border-gray-800 pt-4">
                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 transition-colors group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50"><Heart size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {stats ? stats.totalReports.toLocaleString() : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">Total Reports</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Latest Matches Card */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="font-bold text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Latest Matches</h3>
                                <button
                                    onClick={() => navigate('/my-reports', { state: { activeFilter: 'Matched' } })}
                                    className="text-[10px] bg-blue-50 text-blue-600 px-4 py-1 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                                >
                                    All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {(() => {
                                    const activeMatches = matches?.filter(m =>
                                        m.status !== 'VERIFIED' && m.status !== 'REJECTED'
                                    ) || [];

                                    if (activeMatches.length === 0) {
                                        return (
                                            /* Empty State */
                                            <div className="text-center py-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-100 dark:border-gray-700">
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium px-4">
                                                    No matching items discovered yet. We'll notify you!
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Render only the LATEST singular match as requested ("اخر match")
                                    const latestMatch = [...activeMatches]
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

                                    if (!latestMatch) return null;

                                    // Handle both populated user object and raw user ID string
                                    const lostOwnerId = latestMatch.lostReport?.report?.user?._id || latestMatch.lostReport?.report?.user;
                                    const isMyLostReport = lostOwnerId?.toString() === currentUserId?.toString();

                                    const displayReport = isMyLostReport ? latestMatch.foundReport?.report : latestMatch.lostReport?.report;

                                    if (!displayReport) return null;

                                    const oppositeTypeLabel = isMyLostReport ? "FOUND" : "LOST";
                                    const itemTitle = displayReport?.title || "Item";
                                    const itemImage = getImageUrl(displayReport?.images?.[0]?.url);
                                    const location = displayReport?.locationName || "Nearby Location";

                                    return (
                                        <div
                                            key={latestMatch._id}
                                            className="flex gap-3 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border-b border-gray-50 dark:border-gray-800 last:border-0"
                                            onClick={() => navigate(`/report/${displayReport?._id}`)}
                                        >
                                            {/* Image Container */}
                                            <div className="relative w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                                                <img
                                                    src={itemImage}
                                                    alt="match thumbnail"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute bottom-0 right-0 bg-blue-600 text-[8px] text-white px-1 font-bold rounded-tl-md">
                                                    {latestMatch.score}%
                                                        </div>
                                                    </div>

                                                    {/* Content Container */}
                                                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                                                            {itemTitle} {oppositeTypeLabel}
                                                        </p>
                                                        <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
                                                            near {location.slice(0, 20)} ...
                                                        </p>
                                                        <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1">
                                                            {formatDistanceToNow(new Date(latestMatch.createdAt), { addSuffix: true })}
                                                        </span>

                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${latestMatch.status === 'VERIFIED' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`}></span>
                                                            <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 capitalize">
                                                                {latestMatch.status === 'MATCHED' ? 'Pending' : latestMatch.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                );
                                })()}
                                            </div>
                                        </div>

                        {/* Post Report CTA */ }
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-blue-200 relative overflow-hidden group">
                                        <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                                        <div className="relative z-10">
                                            <h3 className="text-white font-bold text-lg mb-2 leading-tight">Found something?</h3>
                                            <p className="text-blue-100 text-xs mb-4 leading-relaxed">Help someone today by reporting items you've discovered.</p>
                                            <Button
                                                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold border-0 h-10 rounded-xl shadow-sm"
                                                onClick={() => navigate('/create-report')}
                                            >
                                                Start Reporting
                                            </Button>
                                        </div>
                                    </div>
                    </aside>
                        </div>
                </div>
            </div>
            );
};

            export default HomeFeed;