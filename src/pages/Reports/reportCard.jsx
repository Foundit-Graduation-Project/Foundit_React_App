import {
    MapPin,
    Calendar,
    ArrowRight,
    CheckCircle2,
    Trash2,
    XCircle,
    MessageSquare,
    Trophy
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setSelectedReport, deleteReport } from "../../features/reports/reportsSlice";
import { resolveMatchProposal, rejectMatchProposal } from "../../features/matches/matchesSlice";

const ReportCard = ({ report, showDelete = false, matches = [], hideTypeBadge = false, isMyReportView = false }) => {
    const {
        _id,
        title,
        locationName,
        dateHappened,
        images = [],
        type,
        status,
    } = report;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const BASE_URL = "http://localhost:3000";

    // --- Match Integration Logic ---
    const activeMatch = matches[0]; // Take the first relevant match from MyReports filter
    const hasChat = activeMatch?.hasChat || activeMatch?.status === "ACCEPTED" || activeMatch?.status === "VERIFIED";
    const matchScore = activeMatch?.score;
    const isMatchedStatus = (status?.toUpperCase() === "MATCHED" && activeMatch?.status !== "REJECTED") || activeMatch?.status === "VERIFIED";
    const isResolvedStatus = status?.toUpperCase() === "RESOLVED" || activeMatch?.status === "VERIFIED";

    // Identify the "other" report in the match for smart navigation
    const otherReport = activeMatch ? (
        activeMatch.lostReport?.report?._id === _id
            ? activeMatch.foundReport?.report
            : activeMatch.lostReport?.report
    ) : null;

    // --- Helpers ---
    const getImageUrl = (img) => {
        if (!img) return "/src/assets/notFoundImage.jpg";
        const imageUrl = typeof img === 'string' ? img : img.url;
        if (!imageUrl) return "/src/assets/notFoundImage.jpg";
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BASE_URL}/${imageUrl.replace(/\\/g, '/')}`;
    };

    const getBadgeStyle = () => {
        if (isResolvedStatus) return "bg-green-500 text-white hover:bg-green-500 shadow-sm";
        if (isMatchedStatus) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 border border-green-200 dark:border-green-800 shadow-sm";
        if (type?.toUpperCase() === "FOUND") return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 border border-yellow-200 dark:border-yellow-800 shadow-sm";
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 shadow-sm";
    };

    // --- Action Handlers ---
    const handleViewDetails = (e) => {
        if (e) e.stopPropagation();

        // Always navigate to own report details to avoid "another account" confusion.
        // The user can find match details within their own report page.
        dispatch(setSelectedReport(report));
        navigate(`/report/${_id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        const result = await Swal.fire({
            title: 'Delete Report?',
            text: 'Are you sure you want to delete this report? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            customClass: { popup: 'rounded-xl' }
        });
        if (result.isConfirmed) {
            dispatch(deleteReport(_id)).unwrap().catch((err) => {
                console.error("API Error:", err);
            });
        }
    };

    const handleChat = (e) => {
        e.stopPropagation();
        toast.success("Opening chat...");
        // Use standard chat route and pass report context
        navigate(`/chat`);
    };

    const handleResolveMatch = async (e) => {
        e.stopPropagation();
        if (!activeMatch) return;
        const result = await Swal.fire({
            title: 'Resolve Match?',
            text: 'Marking as Resolved will close this report officially. Proceed?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, resolve it',
            cancelButtonText: 'Cancel',
            customClass: { popup: 'rounded-xl' }
        });
        if (result.isConfirmed) {
            dispatch(resolveMatchProposal(activeMatch._id))
                .unwrap()
                .then(() => toast.success("Match resolved successfully!"))
                .catch((err) => toast.error(err.message || "Cannot resolve match"));
        }
    };

    const handleRejectMatch = async (e) => {
        e.stopPropagation();
        if (!activeMatch) return;
        const result = await Swal.fire({
            title: 'Reject Match?',
            text: 'Are you sure you want to reject this match suggestion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, reject it',
            cancelButtonText: 'Cancel',
            customClass: { popup: 'rounded-xl' }
        });
        if (result.isConfirmed) {
            dispatch(rejectMatchProposal(activeMatch._id));
        }
    };

    return (
        <Card
            className={`overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all group cursor-pointer relative ${isResolvedStatus ? 'opacity-75' : ''}`}
            onClick={handleViewDetails}
        >
            {/* --- Action Buttons (Top Left) --- */}
            <div className="absolute top-3 left-3 z-50 flex flex-col gap-2">
                {showDelete && !isMatchedStatus && (
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full shadow-md border border-red-100 transition-all duration-200"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
                {isMatchedStatus && !isResolvedStatus && activeMatch?.status !== "REJECTED" && (
                    <button
                        onClick={handleRejectMatch}
                        className="p-2 bg-white/90 hover:bg-orange-500 hover:text-white text-orange-500 rounded-full shadow-md border border-orange-100 transition-all duration-200"
                    >
                        <XCircle size={16} />
                    </button>
                )}
            </div>

            {/* --- Image Section --- */}
            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                    src={getImageUrl(images[0])}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://placehold.jp/400x300.png?text=No+Image"; }}
                />

                {/* Status Badge */}
                {(!(hideTypeBadge && !isResolvedStatus && !isMatchedStatus)) && (
                    <Badge className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold border-0 shadow-sm ${getBadgeStyle()}`}>
                        {isResolvedStatus ? "RESOLVED" : isMatchedStatus ? "MATCHED" : type?.toUpperCase() || "REPORT"}
                    </Badge>
                )}

                {/* Match Score Badge */}
                {isMatchedStatus && matchScore && (
                    <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1.5 rounded-lg flex items-center shadow-lg border border-white/20">
                        <Trophy size={11} className="mr-1.5 text-yellow-400" /> {matchScore}% MATCH
                    </div>
                )}
            </div>

            {/* --- Information Section --- */}
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                </div>
                {isMyReportView && (
                    <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
                            <span className="truncate text-xs font-medium">{locationName || "Location unavailable"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
                            <span className="text-xs">{dateHappened ? new Date(dateHappened).toLocaleDateString() : "Date unknown"}</span>
                        </div>
                    </div>
                )}
            </CardContent>

            {/* --- Footer (Actions) --- */}
            <CardFooter className="p-4 pt-0">
                {isResolvedStatus ? (
                    <Button disabled className="w-full bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed font-semibold">
                        Case Resolved <CheckCircle2 className="ml-2 w-4 h-4" />
                    </Button>
                ) : isMatchedStatus ? (
                    <div className="flex w-full gap-2">
                        <Button
                            className={`flex-1 font-bold text-sm h-11 transition-all ${(hasChat || activeMatch?.status === 'ACCEPTED' && activeMatch?.status !== 'REJECTED') ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            disabled={!hasChat && activeMatch?.status !== 'ACCEPTED'}
                            onClick={handleResolveMatch}
                        >
                            {"Resolve"}
                            <CheckCircle2 className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="px-3 h-11 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all rounded-xl"
                            onClick={handleChat}
                        >
                            <MessageSquare size={20} className="fill-blue-50" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="secondary"
                        className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white font-bold h-11 rounded-lg border border-blue-100 dark:border-blue-900/50 transition-all"
                        onClick={handleViewDetails}
                    >
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ReportCard;