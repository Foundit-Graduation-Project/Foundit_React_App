import { useState, useMemo } from "react";
import {
    LayoutGrid, Smartphone, PawPrint, Wallet, FileText,
    CheckCircle2, Users, ChevronLeft, ChevronRight, Check
} from "lucide-react";
import { motion } from "framer-motion";

// Components
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import Nav from "../../components/layout/customNavbars/homeNav";
import FeedCard from "../../components/HomeFeed/feedCard";
import { Link } from "react-router-dom";

// --- 1. Expanded Mock Data with Dates & Categories ---
const MOCK_ITEMS = [
    {
        id: 1,
        title: "Silver Honda Keys",
        description: "Lost near Golden Gate Park entrance. Has a blue keychain.",
        location: "Golden Gate Park, SF",
        time: "2 hours ago",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        type: "Lost",
        category: "Electronics", // Keys fit loosely here or separate category
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=60&w=500"
    },
    {
        id: 2,
        title: "Blue North Face Backpack",
        description: "Found at Starbucks on Market St. Contains ID for 'Michael B'.",
        location: "Market St, Downtown",
        time: "5 hours ago",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        type: "Found",
        category: "Wallets & Bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Golden Retriever",
        description: "Very friendly dog found wandering in Mission District. No collar.",
        location: "Mission District, SF",
        time: "1 day ago",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        type: "Found",
        category: "Pets",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=60&w=500"
    },
    {
        id: 4,
        title: "MacBook Air M2",
        description: "Left in a grey felt sleeve at Blue Bottle Coffee.",
        location: "SoMa, San Francisco",
        time: "2 days ago",
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
        type: "Lost",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=60&w=500"
    },
    {
        id: 5,
        title: "Passport",
        description: "Found a US Passport near the airport shuttle stop.",
        location: "SFO Airport",
        time: "5 days ago",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        type: "Found",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1544081075-801c8770c622?auto=format&fit=crop&q=60&w=500"
    },
    {
        id: 6,
        title: "Beats Headphones",
        description: "Lost black Beats Studio 3 on the bus.",
        location: "Downtown Bus 38",
        time: "30 mins ago",
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
        type: "Lost",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=60&w=500"
    },
    {
        id: 7,
        title: "Tabby Cat",
        description: "Lost orange tabby cat, answers to 'Garfield'.",
        location: "Sunset District",
        time: "3 weeks ago",
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
        type: "Lost",
        category: "Pets",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=60&w=500"
    },
];

const CATEGORIES = [
    { name: "All Items", icon: LayoutGrid },
    { name: "Electronics", icon: Smartphone },
    { name: "Pets", icon: PawPrint },
    { name: "Wallets & Bags", icon: Wallet },
    { name: "Documents", icon: FileText },
];

const HomeFeed = () => {
    // --- 2. State for Filters ---
    const [activeTab, setActiveTab] = useState("All Reports"); // "All Reports", "Lost Only", "Found Only"
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [selectedDate, setSelectedDate] = useState("Anytime");

    // --- 3. Filter Logic (The Engine) ---
    const filteredItems = useMemo(() => {
        return MOCK_ITEMS.filter((item) => {
            // A. Filter by Tab (Type)
            if (activeTab === "Lost Only" && item.type !== "Lost") return false;
            if (activeTab === "Found Only" && item.type !== "Found") return false;

            // B. Filter by Category
            if (selectedCategory !== "All Items" && item.category !== selectedCategory) return false;

            // C. Filter by Date
            const now = new Date();
            const diffTime = Math.abs(now - item.createdAt);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (selectedDate === "Last 24 hours" && diffDays > 1) return false;
            if (selectedDate === "Last 7 days" && diffDays > 7) return false;
            if (selectedDate === "Last 30 days" && diffDays > 30) return false;

            return true;
        });
    }, [activeTab, selectedCategory, selectedDate]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 w-full font-sans">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full h-18 px-6 flex items-center justify-between gap-8 shadow-sm">
                <Nav />
            </div>

            <div className="w-full px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* --- LEFT SIDEBAR (Filters) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:block lg:col-span-3 sticky top-24"
                    >
                        <div className="space-y-8 pr-2">

                            {/* Category Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Category</h3>
                                <div className="space-y-1">
                                    {CATEGORIES.map((cat) => (
                                        <motion.button
                                            key={cat.name}
                                            onClick={() => setSelectedCategory(cat.name)}
                                            whileHover={{ x: 4, backgroundColor: "rgba(243, 244, 246, 1)" }}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.name
                                                ? "bg-blue-50/80 text-blue-700 shadow-sm"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            <cat.icon className={`w-4 h-4 ${selectedCategory === cat.name ? "text-blue-600" : "text-gray-400"}`} />
                                            {cat.name}
                                            {selectedCategory === cat.name && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Date Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Date Posted</h3>
                                <div className="space-y-2 px-2">
                                    {["Anytime", "Last 24 hours", "Last 7 days", "Last 30 days"].map((label) => (
                                        <label
                                            key={label}
                                            onClick={() => setSelectedDate(label)}
                                            className="flex items-center gap-3 cursor-pointer group py-1.5"
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${selectedDate === label ? "border-blue-600 bg-blue-600" : "border-gray-300 group-hover:border-blue-400"
                                                }`}>
                                                {selectedDate === label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={`text-sm ${selectedDate === label ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedCategory("All Items");
                                    setSelectedDate("Anytime");
                                    setActiveTab("All Reports");
                                }}
                                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 mt-4"
                            >
                                Clear All Filters
                            </Button>

                        </div>
                    </motion.div>

                    {/* --- CENTER FEED --- */}
                    <div className="lg:col-span-6 space-y-6">

                        {/* Feed Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Reports</h1>

                            <div className="flex items-center gap-2">
                                {/* Gliding Tabs */}
                                <div className="flex bg-gray-100/80 p-1 rounded-xl backdrop-blur-sm relative">
                                    {["All Reports", "Lost Only", "Found Only"].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors z-10 ${activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-white shadow-sm rounded-lg"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className="relative z-10">{tab}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Feed Grid */}
                        <motion.div
                            key={activeTab + selectedCategory + selectedDate} // Re-animate on any filter change
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <FeedCard key={item.id} item={item} index={index} />
                                ))
                            ) : (
                                // Empty State
                                <div className="col-span-full py-12 text-center">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="text-gray-400 w-8 h-8" />
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-lg">No matches found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search criteria.</p>
                                    <Button
                                        variant="link"
                                        onClick={() => { setSelectedCategory("All Items"); setSelectedDate("Anytime"); setActiveTab("All Reports"); }}
                                        className="text-blue-600 mt-2"
                                    >
                                        Clear all filters
                                    </Button>
                                </div>
                            )}
                        </motion.div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mt-10 pb-10">
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200"><ChevronLeft className="w-4 h-4 text-gray-500" /></Button>
                            <Button className="h-9 w-9 rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/20">1</Button>
                            <Button variant="ghost" className="h-9 w-9 rounded-full text-gray-600">2</Button>
                            <span className="text-gray-400 text-sm px-2">...</span>
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200"><ChevronRight className="w-4 h-4 text-gray-500" /></Button>
                        </div>
                    </div>

                    {/* --- RIGHT SIDEBAR (Widgets) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6 pl-4"
                    >
                        {/* Stats Widget */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                            <h3 className="font-bold text-gray-900 mb-5 text-xs uppercase tracking-wider">Community Impact</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 leading-none">1,240</p>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Items Returned</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 leading-none">50k+</p>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Members</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Widget */}
                        <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-blue-600/20 group">
                            <div className="relative z-10">
                                <h3 className="font-bold text-xl mb-2">Found something?</h3>
                                <p className="text-blue-100 text-xs mb-6 leading-relaxed opacity-90">
                                    Help the community by reporting items you discover.
                                </p>
                                <Link to="/create-report" className="block w-full">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-2.5 rounded-lg text-sm shadow-lg text-center cursor-pointer transition-colors"
                                    >
                                        Start Reporting
                                    </motion.div>
                                </Link>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                            <div className="absolute top-4 right-4 text-white/20 transform rotate-12 group-hover:rotate-45 transition-all duration-700">
                                <CheckCircle2 className="w-20 h-20" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HomeFeed;