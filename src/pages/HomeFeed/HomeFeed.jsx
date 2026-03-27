import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReports } from "../../features/reports/reportsSlice";
import { reportsAPI } from "../../features/reports/reportsAPI";
import { Search, Loader2, Smartphone, PawPrint, Wallet, FileText, Users, ChevronLeft, ChevronRight, Key, Box, Heart, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import Nav from "../../components/layout/customNavbars/homeNav";
import ReportCard from "../Reports/reportCard";
import { fetchMyMatches } from "@/features/matches/matchesSlice";

const CATEGORIES = [
    { name: "All Items", value: "" },
    { name: "Electronics", value: "Electronics", icon: Smartphone },
    { name: "Accessories", value: "Accessories", icon: Wallet }

];

const PAGE_LIMIT = 9;

const HomeFeed = () => {
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

    useEffect(() => {
        const params = {
            page,
            limit: PAGE_LIMIT,
            ...(type && { type }),
            ...(category && { category })
        };
        dispatch(fetchReports(params));
        dispatch(fetchMyMatches());
    }, [dispatch, type, category, page]);

    useEffect(() => {
        reportsAPI.getStats().then(data => {
            if (data?.data) setStats(data.data);
        }).catch(() => { });
    }, []);

    const handleFilterChange = (setter, value) => {
        setter(value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 w-full font-sans">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 h-18 px-6 flex items-center shadow-sm">
                <Nav />
            </div>

            <div className="w-full px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-15 gap-8 items-start">

                    {/* SIDEBAR LEFT */}
                    <aside className="hidden lg:block lg:col-span-2 sticky top-24 space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</h3>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => handleFilterChange(setCategory, cat.value)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${category === cat.value ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    {cat.icon && <cat.icon className="w-4 h-4" />}
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN FEED */}
                    <main className="lg:col-span-10 space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Recent Reports</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center">
                                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-gray-500 font-medium">Fetching reports...</p>
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
                                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                    <Search className="mx-auto w-12 h-12 text-gray-200 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-400">No {type} Reports found</h3>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 mt-8 pb-10">
                            <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button variant="outline" disabled={!reports || reports.length < PAGE_LIMIT} onClick={() => setPage(p => p + 1)}>
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
                        {/* Community Impact Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <h3 className="font-bold text-xs text-gray-400 uppercase mb-4 tracking-wider">Community Impact</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-3 bg-green-50 rounded-xl text-green-600 transition-colors group-hover:bg-green-100"><CheckCircle size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {stats ? stats.resolvedReports.toLocaleString() : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Items Returned</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group border-t border-gray-50 pt-4">
                                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-100"><Users size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {stats ? stats.totalMembers.toLocaleString() : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Active Members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group border-t border-gray-50 pt-4">
                                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600 transition-colors group-hover:bg-purple-100"><Heart size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {stats ? stats.totalReports.toLocaleString() : '—'}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase">Total Reports</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Latest Matches Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Latest Matches</h3>
                                <button
                                    onClick={() => navigate('/my-reports', { state: { activeFilter: 'MATCHED' } })}
                                    className="text-[10px] bg-blue-50 text-blue-600 px-4 py-1 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                                >
                                    All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {matches && matches.length > 0 ? (
                                    matches.slice(0, 3).map((match) => {
                                        // Determine which side is the "other" person's report
                                        const isMyLostReport = match.lostReport?.report?.user === currentUserId;
                                        const displayReport = isMyLostReport ? match.foundReport?.report : match.lostReport?.report;

                                        // Logic: If my report is lost, show "Found". If mine is found, show "Lost".
                                        const oppositeTypeLabel = isMyLostReport ? "FOUND" : "LOST";

                                        const itemTitle = displayReport?.title || "Item";
                                        const itemImage = displayReport?.images?.[0] || 'https://placehold.jp/100x100.png';
                                        const location = displayReport?.locationName || "Nearby Location";

                                        return (
                                            <div
                                                key={match._id}
                                                className="flex gap-3 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0"
                                                onClick={() => navigate(`/report/${displayReport?._id}`)}
                                            >
                                                {/* Image Container */}
                                                <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                                                    <img
                                                        src={itemImage}
                                                        alt="match thumbnail"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute bottom-0 right-0 bg-blue-600 text-[8px] text-white px-1 font-bold rounded-tl-md">
                                                        {match.score}%
                                                    </div>
                                                </div>

                                                {/* Content Container */}
                                                <div className="min-w-0 flex-1 flex flex-col justify-center">
                                                    <p className="text-[11px] font-bold text-gray-800 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                                                        {/* Preserved your exact font and spacing, just updated the logic */}
                                                        {itemTitle} {oppositeTypeLabel}
                                                    </p>
                                                    <p className="text-[9px] text-gray-400 truncate mt-0.5">
                                                        near {location.slice(0, 20)} ...
                                                    </p>

                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${match.status === 'resolved' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`}></span>
                                                        <span className="text-[9px] font-medium text-gray-500 capitalize">{match.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    /* Empty State */
                                    <div className="text-center py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-100">
                                        <p className="text-[11px] text-gray-400 font-medium px-4">
                                            No matching items discovered yet. We'll notify you!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Post Report CTA */}
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