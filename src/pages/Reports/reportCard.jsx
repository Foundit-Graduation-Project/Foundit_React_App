import { MapPin, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "../../components/ui/badge"; // Check your ui folder for badge.jsx
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";

const ReportCard = ({ report }) => {
    const { title, location, date, image, type, status } = report;

    const getBadgeStyle = () => {
        if (status === "Matched") return "bg-green-100 text-green-700 hover:bg-green-100";
        if (type === "Found") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"; // Default Lost
    };

    const getBadgeLabel = () => {
        if (status === "Matched") return "MATCHED";
        return type.toUpperCase();
    };

    return (
        <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold border-0 ${getBadgeStyle()}`}>
                    {getBadgeLabel()}
                </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>

                <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{date}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                {status === "Matched" ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        View Outcome <CheckCircle2 className="ml-2 w-4 h-4" />
                    </Button>
                ) : (
                    <Button variant="secondary" className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ReportCard;