import { Database } from "lucide-react";
import TermsOfServicePopup from "../../popups/TermsOfServicePopup";
import PrivacyPolicyPopup from "../../popups/PrivacyPolicyPopup";
import { useState } from "react";
import SupportModel from "../../../pages/Auth/SupportModel";


const myReportsFooter = () => {
    const [termsOpen, setTermsOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <button onClick={() => setTermsOpen(true)} className="hover:text-gray-900 transition-colors">Terms of Service</button>
                    <button onClick={() => setPrivacyOpen(true)} className="hover:text-gray-900 transition-colors">Privacy Policy</button>
                    <button onClick={() => setIsModalOpen(true)} className="hover:text-gray-900 transition-colors">Contact Support</button>
                </div>

                {/* 3. Right: Copyright */}
                <div className="text-sm text-gray-400">
                    © 2026 FoundIt Inc. All rights reserved.
                </div>
                <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
                <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
                <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />


            </div>
        </footer>
    );
};

export default myReportsFooter;