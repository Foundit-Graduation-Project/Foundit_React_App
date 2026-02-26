import { Link } from "react-router-dom";
import { Search, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

const PaymentNav = () => {
    return (
        <nav className="w-full h-16 bg-white border-b border-gray-100 px-4 md:px-10 flex items-center justify-between sticky top-0 z-50">

            <div className="flex items-center gap-2">
                <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
                    <Search className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Foundit
                </span>
            </div>

            <div className="flex items-center gap-8">
                {/* 2. Navigation Links - Now moved right */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/profile" label="Profile" />
                    <NavLink to="/my-reports" label="Reports" />
                    <NavLink to="/payment/checkout" label="Billing" />
                    <NavLink to="/profile/settings" label="Settings" isActive={true} />
                </div>

                {/* 3. User Profile */}
                <div className="flex items-center gap-4 border-l pl-8 border-gray-100">
                    <Avatar className="h-9 w-9 cursor-pointer border border-gray-200 hover:ring-2 hover:ring-blue-100 transition">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                            ML
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

        </nav>
    );
};

// --- Helper Component for Links ---
const NavLink = ({ to, label, isActive = false }) => {
    return (
        <Link
            to={to}
            className={`relative text-sm font-medium transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                }`}
        >
            {label}
            {/* Blue Underline for Active State */}
            {isActive && (
                <span className="absolute -bottom-5.25 left-0 w-full h-0.5 bg-blue-600 rounded-t-sm" />
            )}
        </Link>
    );
};

export default PaymentNav;