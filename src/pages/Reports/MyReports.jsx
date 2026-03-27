
import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import ReportCard from "./reportCard";
import Nav from "../../components/layout/customNavbars/myReportsNav";
import Footer from "../../components/layout/customFooters/myReportsFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReports, clearReportError } from "../../features/reports/reportsSlice";
import { fetchMyMatches } from "../../features/matches/matchesSlice";

const MyReports = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All Reports");

  const { reports, loading, error } = useSelector((state) => state.report);
  const { matches } = useSelector((state) => state.match);

  useEffect(() => {
    dispatch(clearReportError());
    // Handling error locally using unwrap() if needed
    dispatch(fetchMyReports())
      .unwrap()
      .catch((err) => {
        console.error("Local component error handling:", err);
      });
      
    dispatch(fetchMyMatches());
  }, [dispatch]);

  const filteredReports = Array.isArray(reports)
    ? reports.filter((report) => {
      if (activeTab === "All Reports") return true;

      // Expand "Matched" filter to catch backwards-compatible native matches that may still be OPEN natively 
      if (activeTab === "Matched") {
        return report.status?.toUpperCase() === "MATCHED" || report.status?.toUpperCase() === "RESOLVED";
      }

      return report.type?.toUpperCase() === activeTab.toUpperCase();
    })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Nav />
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Reports</h2>
          <p className="text-gray-500 mt-1">Track and manage your lost and found submissions in one place.</p>
        </div>

        {/* Filters & Sort Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex gap-1 shadow-sm">
            {["All Reports", "Lost", "Found", "Matched"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Button variant="outline" className="text-gray-600 border-gray-300">
            Sort by: Newest First <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
          </Button>
        </div>

        {/* --- Handling States (Loading/Error/Empty) --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-gray-500 mt-4">Loading your database reports...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
            <p className="font-bold">Error loading reports</p>
            <p className="text-sm">
                {typeof error === "string" ? error : (error.message || JSON.stringify(error) || "Please check your connection.")}
            </p>
          </div>
        ) : (
          <>
            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    showDelete={true}
                    matches={matches?.filter(m => (m.lostReport?.report?._id === report._id || m.foundReport?.report?._id === report._id) && m.status !== 'REJECTED')}
                    isMyReportView={true}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                  <p className="text-gray-400">No reports found in this category.</p>
                </div>
              )}
            </div>

            {filteredReports.length > 0 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <Button variant="outline" className="bg-white rounded-full px-8 border-gray-200 text-gray-700 shadow-sm">
                  Load More Reports
                </Button>

                <div className="flex items-center gap-2 mt-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button className="h-8 w-8 bg-blue-600 text-white rounded-md p-0">1</Button>
                  <Button variant="ghost" className="h-8 w-8 text-gray-600 p-0">2</Button>
                  <Button variant="ghost" className="h-8 w-8 text-gray-600 p-0">3</Button>
                  <span className="text-gray-400">...</span>
                  <Button variant="ghost" className="h-8 w-8 text-gray-600 p-0">12</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyReports;