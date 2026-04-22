import { Search, Wallet } from 'lucide-react'
import SupportModel from '../../../pages/Auth/SupportModel'
import { useState } from 'react';
export default function RegisterNav() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <button onClick={() => setIsModalOpen(true)} className="text-blue-600  font-semibold cursor-pointer transition-colors">Support</button>
                <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </div>

        </nav>

    )
}
