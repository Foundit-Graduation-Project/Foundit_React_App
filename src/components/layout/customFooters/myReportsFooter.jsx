import { Database } from "lucide-react";


const myReportsFooter = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-10 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* 1. Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-lg text-gray-900 tracking-tight">FoundIt</span>
                </div>

                {/* 2. Center: Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium text-gray-500">
                    <a href="#" className="hover:text-gray-900 transition-colors">Help Center</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Contact Support</a>
                </div>

                {/* 3. Right: Copyright */}
                <div className="text-sm text-gray-400">
                    © 2023 FoundIt Inc. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default myReportsFooter;