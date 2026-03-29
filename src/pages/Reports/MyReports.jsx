import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, Search, ArrowUpDown, SortAsc } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import ReportCard from "./reportCard";
import Nav from "../../components/layout/customNavbars/myReportsNav";
import Footer from "../../components/layout/customFooters/myReportsFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReports, clearReportError } from "../../features/reports/reportsSlice";
import { fetchMyMatches } from "../../features/matches/matchesSlice";

const PAGE_LIMIT = 9;

const MyReports = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // Local state for pagination, filtering, and sorting
  const [activeTab, setActiveTab] = useState("All Reports");
  const [page, setPage] = useState(1);

  // State for sorting: stores both label for UI and value for API
  const [sortConfig, setSortConfig] = useState({
    label: "Newest First",
    value: "-createdAt"
  });

  const { reports, loading, error } = useSelector((state) => state.report);
  const { matches } = useSelector((state) => state.match);

  useEffect(() => {
    dispatch(clearReportError());

    // Prepare API params including pagination, type filtering, and sorting
    const params = {
      page,
      limit: PAGE_LIMIT,
      sort: sortConfig.value,
      keyword: searchTerm,
      ...(activeTab === "Lost" && { type: "LOST" }),
      ...(activeTab === "Found" && { type: "FOUND" }),
      ...(activeTab === "Matched" && { status: "MATCHED" }),
      ...(activeTab === "Resolved" && { status: "RESOLVED" })
    };

    dispatch(fetchMyReports(params))
      .unwrap()
      .catch((err) => {
        console.error("API Error:", err);
      });

    dispatch(fetchMyMatches());
  }, [dispatch, page, activeTab, sortConfig, searchTerm]);

  // Reset to first page when filters change
  const handleFilterChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  // Update sort configuration and reset to first page
  const handleSortChange = (label, value) => {
    setSortConfig({ label, value });
    setPage(1);
  };

  return (
    /* flex flex-col and min-h-screen ensures the footer stays at the bottom */
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-100 shadow-sm">
        <Nav />
      </div>

      {/* Main content area expands to push footer down */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Reports</h2>
          <p className="text-gray-500 mt-1">Track and manage your lost and found submissions in one place.</p>
        </div>

        {/* Toolbar: Tabs & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Tabs */}
          <div className="bg-white p-1 rounded-xl border border-gray-200 flex gap-1 shadow-sm">
            {["All Reports", "Lost", "Found", "Matched", "Resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-gray-600 border-gray-200 bg-white rounded-xl shadow-sm hover:bg-gray-50">
                <SortAsc className="w-4 h-4 mr-2 opacity-70" />
                Sort by: {sortConfig.label}
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white rounded-xl border-gray-100 shadow-xl min-w-[160px]">
              <DropdownMenuItem
                className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSortChange("Newest First", "-createdAt")}
              >
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSortChange("Oldest First", "createdAt")}
              >
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm font-medium py-2.5 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSortChange("Name (A-Z)", "title")}
              >
                Name (A-Z)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Data Display Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <p className="text-gray-500 mt-4 font-semibold tracking-wide">Fetching your records...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 max-w-2xl mx-auto shadow-sm">
            <p className="font-bold text-lg mb-1">Failed to load reports</p>
            <p className="text-sm opacity-80">
              {typeof error === "string" ? error : (error.message || "Connection lost. Please try again.")}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(reports) && reports.length > 0 ? (
                reports.map((report) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    showDelete={true}
                    matches={matches?.filter(m =>
                      (m.lostReport?.report?._id === report._id || m.foundReport?.report?._id === report._id)
                      && m.status !== 'REJECTED'
                    )}
                    isMyReportView={true}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 shadow-sm flex flex-col items-center justify-center">
                  <div className="p-5 bg-gray-50 rounded-full mb-4">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No {activeTab !== "All Reports" ? activeTab : ""} reports yet</h3>
                  <p className="text-gray-400 text-sm mt-1">Start by creating a new lost or found report.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {Array.isArray(reports) && reports.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={!reports || reports.length < PAGE_LIMIT}
                  onClick={() => setPage(p => p + 1)}
                  className="rounded-xl"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyReports;