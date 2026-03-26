import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../../features/reports/reportsSlice";
import { Search, Loader2, Smartphone, PawPrint, Wallet, FileText, Users, ChevronLeft, ChevronRight, Key, Box } from "lucide-react";
import { Button } from "../../components/ui/button";
import Nav from "../../components/layout/customNavbars/homeNav";
import ReportCard from "../Reports/reportCard";

const CATEGORIES = [
    { name: "All Items", value: "" },
    { name: "Electronics", value: "Electronics", icon: Smartphone },
    { name: "Pets", value: "Pets", icon: PawPrint },
    { name: "Wallets", value: "Wallets", icon: Wallet },
    { name: "Documents", value: "Documents", icon: FileText },
    { name: "Keys", value: "Keys", icon: Key },
    { name: "Other", value: "Other", icon: Box },
];

const HomeFeed = () => {
    const dispatch = useDispatch();
    const { reports, loading } = useSelector((state) => state.report);

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const params = {
            page,
            limit: 10,
            ...(type && { type }),
            ...(category && { category })
        };
        dispatch(fetchReports(params));
    }, [dispatch, type, category, page]);

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
                            <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                {[
                                    { label: "All", value: "" },
                                    { label: "Lost", value: "LOST" },
                                    { label: "Found", value: "FOUND" }
                                ].map(tab => (
                                    <button
                                        key={tab.label}
                                        onClick={() => handleFilterChange(setType, tab.value)}
                                        className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${type === tab.value ? "bg-white shadow-sm text-blue-600" : "text-gray-500"}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center">
                                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-gray-500 font-medium">Fetching reports...</p>
                                </div>
                            ) : Array.isArray(reports) && reports.length > 0 ? (
                                reports.map((report) => (
                                    <ReportCard key={report._id} report={report} isMyReportView={false}
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
                            <Button variant="outline" disabled={!reports || reports.length < 10} onClick={() => setPage(p => p + 1)}>
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6 pl-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-xs text-gray-400 uppercase mb-4">Live Updates</h3>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Users size={20} /></div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900">{reports?.length || 0}</p>
                                    <p className="text-xs text-gray-500 font-medium">Visible Reports</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default HomeFeed;