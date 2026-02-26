import { MapPin, Clock, Bookmark } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { motion } from "framer-motion"; // 1. Import Framer Motion
import { Link } from "react-router-dom";

const FeedCard = ({ item, index }) => {
    const { title, description, location, time, type, image } = item;
    const isLost = type === "Lost";

    // 🎨 Badge Styles
    const badgeClass = isLost
        ? "bg-red-50 text-red-600 border-red-100"
        : "bg-green-50 text-green-600 border-green-100";

    return (
        <motion.div
            layout // Allows smooth resizing if list changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }} // Stagger effect based on index
            whileHover={{ y: -5 }} // Subtle lift on hover
        >
            <Card className="group h-full overflow-hidden border-gray-100/60 bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100/50 transition-all duration-300">

                {/* 🖼️ Image Section */}
                <div className="relative h-56 w-full bg-gray-50 overflow-hidden">
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }} // Zoom effect inside the container
                        transition={{ duration: 0.6 }}
                    />

                    <Badge className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md bg-opacity-90 ${badgeClass}`}>
                        {type}
                    </Badge>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                        <Bookmark className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* 📄 Content Section */}
                <CardContent className="p-5">
                    <div className="mb-3">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="space-y-2.5 mt-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center text-xs font-medium text-gray-500">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-blue-500 shrink-0" />
                            <span className="truncate">{location}</span>
                        </div>
                        <div className="flex items-center text-xs font-medium text-gray-500">
                            <Clock className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
                            <span>{time}</span>
                        </div>
                    </div>
                </CardContent>

                {/* 🔘 Footer Actions */}
                <CardFooter className="p-5 pt-0">
                    <Link to={`/report/${item.id}`} className="w-full">
                        <Button
                            className={`w-full font-semibold h-11 shadow-sm transition-all duration-300 ${isLost
                                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200 hover:shadow-lg"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-200 hover:shadow-lg"
                                }`}
                        >
                            {isLost ? "Contact Owner" : "Claim Item"}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default FeedCard;