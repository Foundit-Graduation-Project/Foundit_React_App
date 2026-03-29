import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportById } from "../../features/reports/reportsSlice";
import { MapPin, Clock, Loader2 } from "lucide-react";

import Nav from "../../components/layout/customNavbars/myReportsNav";
import ReportGallery from "./ReportGallery";
import ReportInfo from "./ReportInfo";
import ReportSidebar from "./ReportSidebar";
import ReportFooter from "./ReportFooter";
import NotFound from './../NotFound/NotFound';

import { fetchMyMatches } from "../../features/matches/matchesSlice";

export default function ReportDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedReport: item, loading, error } = useSelector((state) => state.report);
  const { matches } = useSelector((state) => state.match);

  const actualMatchData = matches?.find(m =>
    m.lostReport?.report?._id === item?._id ||
    m.foundReport?.report?._id === item?._id
  );
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchReportById(id));
      if (currentUser) {
        dispatch(fetchMyMatches());
      }
    }
  }, [id, dispatch, currentUser]);

  const isOwner = currentUser?._id === item?.user?._id || currentUser?._id === item?.user;

  // Use report status instead of fetching /my-matches
  const isMatched = item?.status === 'MATCHED' || item?.status === 'RESOLVED';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !item) return <NotFound />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between w-full">
        <Nav />
      </div>

      <main className="grow container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            {/* <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              {item.type} Item
            </span> */}
            {isOwner && (
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border ${
                  item.type === 'LOST' 
                    ? 'bg-blue-50 text-blue-600 border-blue-100' 
                    : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                }`}>
                  {item.type} ITEM
                </span>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-emerald-100">
                  MY REPORT
                </span>
                {item.status === 'RESOLVED' && (
                  <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-green-100">
                    RESOLVED
                  </span>
                )}
              </div>
            )}
            {!isOwner && isMatched && (
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {item.type} Item
                </span>
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-indigo-100">
                  MATCHED ITEM
                </span>
                {item.status === 'RESOLVED' && (
                  <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-green-100">
                    RESOLVED
                  </span>
                )}
              </div>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} /> Posted {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{item.title}</h1>
          <p className="text-blue-600 font-semibold flex items-center gap-1.5">
            <MapPin size={18} /> {(isMatched || isOwner) ? item.locationName : item.locationName?.split(',').pop().trim()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ReportGallery images={item.images} title={item.title} id={item._id} />
            <ReportInfo item={item} isOwner={isOwner} />
          </div>
          <div className="lg:col-span-1">
            <ReportSidebar item={item} match={actualMatchData} />
          </div>
        </div>
      </main>
      <ReportFooter />
    </div>
  );
}