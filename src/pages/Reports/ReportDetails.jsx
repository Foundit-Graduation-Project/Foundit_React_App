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

export default function ReportDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { selectedReport: item, loading, error } = useSelector((state) => state.report);

  useEffect(() => {
    if (id) {
      dispatch(fetchReportById(id));
    }
  }, [id, dispatch]);

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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <Nav />
      </div>

      <main className="grow container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              {item.type} Item
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} /> Posted {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{item.title}</h1>
          <p className="text-blue-600 font-semibold flex items-center gap-1.5">
            <MapPin size={18} /> {item.locationName || "Location not specified"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ReportGallery images={item.images} title={item.title} id={item._id} />
            <ReportInfo item={item} />
          </div>
          <div className="lg:col-span-1">
            <ReportSidebar item={item} />
          </div>
        </div>
      </main>
      <ReportFooter />
    </div>
  );
}