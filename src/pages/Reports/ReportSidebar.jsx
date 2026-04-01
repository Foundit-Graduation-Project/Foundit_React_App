import {
  ShieldCheck,
  Handshake,
  Mail,
  Share2,
  Flag,
  CheckCircle2,
  Newspaper,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SupportModel from "../Auth/SupportModel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConversationAPI } from "../../features/chat/chatSlice";
import toast from "react-hot-toast";
import { acceptMatchProposal } from "../../features/matches/matchesSlice";

export default function ReportSidebar({ item, match }) {
  const [supportOpen, setSupportOpen] = useState(false);
  const matchedReportId =
    match?.lostReport?.report?._id === item._id
      ? match?.foundReport?.report?._id
      : match?.lostReport?.report?._id;

  const { user: currentUser } = useSelector((state) => state.auth);

  const matchedReport =
    match?.lostReport?.report?._id === item._id
      ? match?.foundReport?.report
      : match?.lostReport?.report;

  const isMyMatchedReport =
    (matchedReport?.user?._id || matchedReport?.user)?.toString() === currentUser?._id?.toString();

  const isOwner =
    (item?.user?._id || item?.user)?.toString() === currentUser?._id?.toString();

  const getSidebarTitle = () => {
    if (item.status === "RESOLVED") return "Case Resolved!";
    if (item.status === "MATCHED") return "Match Found!";
    if (isOwner) return "Your Report is Active";
    return "Recognize this?";
  };

  const getSidebarDesc = () => {
    if (item.status === "RESOLVED")
      return "This report has been successfully resolved.";
    if (item.status === "MATCHED")
      return "A potential match has been identified for this item.";
    if (isOwner)
      return "Your report is live and being matched against other reports. You can submit another report in the meantime.";
    return "Click below to start the verification process if you lost this item or found its owner.";
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const myUserId = storedUser?._id;
  const owner = item?.user;
  const ownerId = owner?._id || owner;

  const handleContactOwner = async () => {
    if (match && match.status !== "ACCEPTED") {
      try {
        await dispatch(acceptMatchProposal(match._id)).unwrap();
        await dispatch(createConversationAPI(ownerId)).unwrap();

        toast.success("Match accepted! Redirecting to chat...");
        navigate("/chat");
      } catch (error) {
        toast.error(error || "Something went wrong.");
      }
    } else {
      navigate("/chat");
    }
  };

  return (
    <>
      <div className="sticky top-20 space-y-6 font-sans">
        {/* CARD 0: Match Analysis (Only if Matched) */}

        {(item.status === "MATCHED" || item.status === "RESOLVED") && match && (
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
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">
                  SCORE
                </p>
                <p className="text-2xl font-black">{match?.score}%</p>
              </div>

              <div className="h-8 w-[1px] bg-white/20"></div>

              <div className="flex-1">
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">
                  DISTANCE
                </p>
                <p className="text-xl font-black">
                  {match?.distance !== undefined
                    ? `${match.distance.toFixed(1)} km`
                    : "0 km"}
                </p>
              </div>

              <div className="h-8 w-[1px] bg-white/20"></div>

              <div className="flex-1">
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-1">
                  CONFIDENCE
                </p>
                <p className="text-sm font-bold">
                  {match?.score > 80 ? "High" : "Mid"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-2">
                  MATCHING FACTORS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags?.slice(0, 5).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags?.length > 5 && (
                    <span className="text-[10px] font-bold text-blue-200 text-center py-1">
                      +{item.tags.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-black/10 p-3 rounded-lg border border-white/5">
                <p className="text-[11px] leading-relaxed text-blue-50">
                  <span className="font-bold text-white">Why this score?</span>{" "}
                  Calculated based on category alignment, common keywords,
                  geospatial proximity, and temporal overlap.
                </p>
              </div>

              {matchedReportId && (
                <Link to={`/report/${matchedReportId}`} className="block">
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-12 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95">
                    {isOwner ? "View Matched Report" : "View My Report"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {getSidebarTitle()}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{getSidebarDesc()}</p>

          <div className="space-y-3 mb-6">
            {item.status !== "MATCHED" && item.status !== "RESOLVED" && (
              <Link to={`/create-report`} className="block">
                <Button className="w-full bg-[#1d61f2] hover:bg-blue-700 text-white h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2">
                  {isOwner ? (
                    <>
                      <Newspaper size={20} /> Create Another Report
                    </>
                  ) : (
                    <>
                      <Handshake size={20} /> Start Verification
                    </>
                  )}
                </Button>
              </Link>
            )}
            {(item.status === "MATCHED" || item.status === "RESOLVED") && (
              <Button
                onClick={handleContactOwner}
                variant="ghost"
                className="w-full bg-[#1d61f2] text-white hover:text-white hover:bg-blue-700 h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2"
              >
                <Mail size={20} /> {isOwner ? "View Messages" : "Contact Owner"}
              </Button>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-center">
            <button
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setSupportOpen(true)}
            >
              <Flag size={18} /> Report
            </button>
          </div>
        </div>
      </div>
      <SupportModel isOpen={supportOpen} setIsOpen={setSupportOpen} />
    </>
  );
}
