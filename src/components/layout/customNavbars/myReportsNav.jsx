import { Input } from "../../ui/input";
import { Search, Plus, Database } from "lucide-react";
import { Button } from "../../ui/button";


const myReportsNav = () => {
    return (
        <>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-lg text-gray-900 tracking-tight">FoundIt</span>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <a href="#" className="text-gray-900">Dashboard</a>
                    <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-5 -mb-5">My Reports</a>
                    <a href="#" className="hover:text-gray-900">Messages</a>
                    <a href="#" className="hover:text-gray-900">Community</a>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search reports..." className="pl-9 bg-gray-50 border-gray-200" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> New Report
                </Button>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold ml-2">
                    JD
                </div>
            </div>
        </>
    );
};

export default myReportsNav;