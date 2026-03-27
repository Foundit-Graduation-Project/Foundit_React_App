import { ShieldCheck, Handshake, Mail, Share2, Flag, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import SupportModel from "../Auth/SupportModel";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ReportSidebar({ item, match }) {
  const [supportOpen, setSupportOpen] = useState(false);
  console.log(match);
  const matchedReportId = match?.lostReport?.report?._id === item._id
    ? match?.foundReport?.report?._id
    : match?.lostReport?.report?._id;

  console.log(matchedReportId);
  const { user: currentUser } = useSelector((state) => state.auth);

  const matchedReport = match?.lostReport?.report?._id === item._id
    ? match?.foundReport?.report
    : match?.lostReport?.report;

  const isMyMatchedReport = matchedReport?.user === currentUser?._id || matchedReport?.user?._id === currentUser?._id;

  const isOwner = currentUser?._id === item?.user?._id || currentUser?._id === item?.user;

  const getSidebarTitle = () => {
    if (item.status === "MATCHED") return "Match Found!";
    return "Recognize this?";
  };

  const getSidebarDesc = () => {
    if (item.status === "MATCHED") return "A potential match has been identified for this item.";
    return "Click below to start the verification process if you lost this item or found its owner.";
  };

  return (
    <>
      <div className="sticky top-20 space-y-6 font-sans">
        {/* CARD 0: Match Analysis (Only if Matched) */}

        {item.status === "MATCHED" && match && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg border border-blue-500 text-white animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <CheckCircle2 size={20} className="text-blue-200" />
                Match Analysis
              </h3>
              <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                {match?.status}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mb-6 text-center">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">SCORE</p>
                <p className="text-2xl font-black">{match?.score}%</p>
              </div>

              <div className="h-8 w-[1px] bg-white/20"></div>

              <div className="flex-1">
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">DISTANCE</p>
                <p className="text-xl font-black">
                  {match?.distance !== undefined ? `${match.distance.toFixed(1)} km` : "0 km"}
                </p>
              </div>

              <div className="h-8 w-[1px] bg-white/20"></div>

              <div className="flex-1">
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">CONFIDENCE</p>
                <p className="text-sm font-bold">{match?.score > 80 ? "High" : "Mid"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-2">MATCHING FACTORS</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags?.slice(0, 5).map((tag, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold border border-white/10">
                      #{tag}
                    </span>
                  ))}
                  {item.tags?.length > 5 && <span className="text-[10px] font-bold text-blue-200 text-center py-1">+{item.tags.length - 5} more</span>}
                </div>
              </div>

              <div className="bg-black/10 p-3 rounded-lg border border-white/5">
                <p className="text-[11px] leading-relaxed text-blue-50">
                  <span className="font-bold text-white">Why this score?</span> Calculated based on category alignment, common keywords, geospatial proximity, and temporal overlap.
                </p>
              </div>
              {matchedReportId && (
                <Link to={`/report/${matchedReportId}`} className="block">
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-12 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95">
                    View Matched Report
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {getSidebarTitle()}</h3>
          <p className="text-sm text-slate-500 mb-6">{getSidebarDesc()}</p>

          <div className="space-y-3 mb-6">
            {item.status !== "MATCHED" && (
              <Link to={`/create-report`} className="block">
                <Button className="w-full bg-[#1d61f2] hover:bg-blue-700 h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2">
                  <Handshake size={20} /> {(item.status !== "MATCHED") && "Start Verification"}
                </Button>
              </Link>
            )}
            {item.status === "MATCHED" && (
              <Link to={`/chat`} className="block">
                <Button variant="ghost" className="w-full bg-[#1d61f2] text-white hover:text-white hover:bg-blue-700 h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2">
                  <Mail size={20} /> {isOwner ? "View Messages" : "Contact Owner"}
                </Button>
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-center">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setSupportOpen(true)}>
              <Flag size={18} /> Report

            </button>
          </div>

        </div>
      </div>
      <SupportModel isOpen={supportOpen} setIsOpen={setSupportOpen} />
    </>
  );
}