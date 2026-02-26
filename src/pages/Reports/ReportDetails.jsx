import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, Clock } from "lucide-react";

import ReportHeader from './ReportHeader';
import ReportFooter from "./ReportFooter";
import Nav from "../../components/layout/customNavbars/myReportsNav";
import ReportGallery from "./ReportGallery";
import ReportInfo from "./ReportInfo";
import ReportSidebar from "./ReportSidebar";

import { MOCK_REPORTS } from "../../features/reports/reportConstants";
import { setSelectedReport } from "../../features/reports/reportsSlice";
import NotFound from './../NotFound/NotFound';

export default function ReportDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.report.selectedReport);

  useEffect(() => {
    if (!item && id) {
      const foundReport = MOCK_REPORTS.find(r => r.id === parseInt(id));
      if (foundReport) dispatch(setSelectedReport(foundReport));
    }
  }, [id, item, dispatch]);

  if (!item) return <NotFound />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
   <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Nav />
      </div>

      <main className="grow container mx-auto px-4 py-8 mt-0">
    
      <ReportHeader />

        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{item.type} Item</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={12} /> Posted {item.date}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{item.title}</h1>
          <p className="text-blue-600 font-semibold flex items-center gap-1.5"><MapPin size={18} /> {item.location}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ReportGallery images={item.images} title={item.title} id={item.id} />
            <ReportInfo item={item} />
          </div>
          <ReportSidebar />
        </div>
      </main>
      <ReportFooter />
    </div>
  );
}