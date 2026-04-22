// import { MapPin, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
// import { Badge } from "../../components/ui/badge"; 
// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardFooter } from "../../components/ui/card";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSelectedReport } from "../../features/reports/reportsSlice";

// const ReportCard = ({ report }) => {
//     const { _id, title, locationName, dateHappened, images, type, status } = report;

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

   
//     const BASE_URL = "http://localhost:3000"; 

//     const getImageUrl = (img) => {
//         if (!img) return "/src/assets/notFoundImage.jpg";
//         if (img.startsWith('http')) return img; 
//         return `${BASE_URL}/${img.replace(/\\/g, '/')}`;
//     };

//     const handleViewDetails = () => {
//         dispatch(setSelectedReport(report));
//         navigate(`/report/${_id}`);
//     };

//     const getBadgeStyle = () => {
//         if (status === "Matched" || status === "MATCHED") return "bg-green-100 text-green-700 hover:bg-green-100";
//         if (type === "Found" || type === "FOUND") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
//         return "bg-blue-100 text-blue-700 hover:bg-blue-100"; 
//     };

//     return (
//         <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={handleViewDetails}>
//             <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
//                 <img
//                     src={getImageUrl(images[0])}
//                     alt={title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   
//                     onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Image+Error"; }}
//                 />
//                 <Badge className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold border-0 ${getBadgeStyle()}`}>
//                     {type?.toUpperCase() || "REPORT"}
//                 </Badge>
//             </div>

//             <CardContent className="p-4 space-y-3">
//                 <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>

//                 <div className="space-y-1">
//                     <div className="flex items-center text-sm text-gray-500">
//                         <MapPin className="w-4 h-4 mr-2 text-gray-400" />
//                         <span className="truncate">{locationName || "No location"}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500">
//                         <Calendar className="w-4 h-4 mr-2 text-gray-400" />
//                         <span>{dateHappened ? new Date(dateHappened).toLocaleDateString() : "No date"}</span>
//                     </div>
//                 </div>
//             </CardContent>

//             <CardFooter className="p-4 pt-0">
//                 {(status === "Matched" || status === "MATCHED") ? (
//                     <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
//                         View Outcome <CheckCircle2 className="ml-2 w-4 h-4" />
//                     </Button>
//                 ) : (
//                     <Button variant="secondary" className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
//                     onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
//                         View Details <ArrowRight className="ml-2 w-4 h-4" />
//                     </Button>
//                 )}
//             </CardFooter>
//         </Card>
//     );
// };

// export default ReportCard;



import { MapPin, Calendar, ArrowRight, CheckCircle2, Trash2 } from "lucide-react"; 
import { Badge } from "../../components/ui/badge"; 
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedReport, deleteReport } from "../../features/reports/reportsSlice";

const ReportCard = ({ report, showDelete = false }) => {
    const { _id, title, locationName, dateHappened, images, type, status } = report;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const BASE_URL = "http://localhost:3000"; 

    const getImageUrl = (img) => {
        if (!img) return "/src/assets/notFoundImage.jpg";
        if (img.startsWith('http')) return img; 
        return `${BASE_URL}/${img.replace(/\\/g, '/')}`;
    };

    const handleViewDetails = () => {
        dispatch(setSelectedReport(report));
        navigate(`/report/${_id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); 
        if (window.confirm("Are you sure you want to delete this report?")) {
            dispatch(deleteReport(_id));
        }
    };

    const getBadgeStyle = () => {
        if (status === "Matched" || status === "MATCHED") return "bg-green-100 text-green-700 hover:bg-green-100";
        if (type === "Found" || type === "FOUND") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"; 
    };

    return (
        <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative" onClick={handleViewDetails}>
            
            {showDelete && (
                <button 
                    onClick={handleDelete}
                    className="absolute top-3 left-3 z-50 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full shadow-md border border-red-100 transition-all duration-200"
                    title="Delete Report"
                >
                    <Trash2 size={18} />
                </button>
            )}

            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                    src={getImageUrl(images[0])}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://placehold.jp/400x300.png?text=Image+Error"; }}
                />
                <Badge className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold border-0 ${getBadgeStyle()}`}>
                    {type?.toUpperCase() || "REPORT"}
                </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>

                <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{locationName || "No location"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{dateHappened ? new Date(dateHappened).toLocaleDateString() : "No date"}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                {(status === "Matched" || status === "MATCHED") ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        View Outcome <CheckCircle2 className="ml-2 w-4 h-4" />
                    </Button>
                ) : (
                    <Button variant="secondary" className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                    onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ReportCard;



