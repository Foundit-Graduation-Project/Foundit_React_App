import { Link } from "react-router-dom";
import {
  CheckCircle2, Download, Plus, CreditCard, User,
  Settings as SettingsIcon, Bell, LogOut,
  Search
} from "lucide-react";
import { Button } from "../../components/ui/button";
import SupportModel from "../Auth/SupportModel";
import TermsOfServicePopup from "../../components/popups/TermsOfServicePopup";
import PrivacyPolicyPopup from "../../components/popups/PrivacyPolicyPopup";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { currentUser } from "../../components/chat/mockData";
const PaymentSuccess = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Mock data - In the future, this will come from Redux (paymentSlice) via useLocation or useSelector
  const transactionDetails = {
    amount: "$149.00 USD",
    id: "#TXN-88291-00",
    date: "October 24, 2023",
    method: "Visa ending in 4242",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Foundit</span>
          </div>
          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:bg-slate-50 p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold leading-tight text-slate-900">{currentUser.name}</span>
                  <span className="text-xs text-slate-500">{currentUser.role}</span>
                </div>
                <Avatar className="w-9 h-9 border border-slate-100 shadow-sm">
                  <AvatarImage src={currentUser?.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback className={`font-medium ${currentUser.color}`}>
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">{currentUser.name}</p>
                  <p className="text-xs leading-none text-slate-500">alex.rivera@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/settings" className="flex items-center w-full">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/notifications" className="flex items-center w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" /><span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-6 text-sm text-gray-500">
          <span className="text-blue-600">Billing</span>
          <span className="mx-2">›</span>
          <span className="font-medium text-gray-900">Payment Success</span>
        </div>

        {/* Main Success Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mb-8">
            Your credits have been updated and are ready to use.
          </p>

          {/* Transaction Details Box */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-y-6">

              {/* Amount */}
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
                  Amount Paid
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  {transactionDetails.amount}
                </p>
              </div>

              {/* Transaction ID */}
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
                  Transaction ID
                </p>
                <p className="text-gray-900 font-medium">
                  {transactionDetails.id}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-gray-900 font-medium">
                  {transactionDetails.date}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
                  Payment Method
                </p>
                <div className="flex items-center gap-2 text-gray-900 font-medium">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>{transactionDetails.method}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link to="/create-report">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
                <Plus className="mr-2 h-5 w-5" />
                Create New Report
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 h-12 text-base"
              onClick={() => alert("Downloading PDF... (Functionality to be added)")}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Receipt (PDF)
            </Button>
          </div>
          <div className="mt-8 text-xs text-gray-400 flex flex-col gap-2">
            <p>
              Questions? <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline">Contact Support</button>.
            </p>
            <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          </div>

        </div>
        {/* Footer Links */}
        <div className="mt-8 text-xs text-gray-400 flex flex-col gap-2">
          <div className="flex justify-center gap-4 mt-2">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-gray-600 transition-colors">Privacy Policy</button>
            <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
            <button onClick={() => setTermsOpen(true)} className="hover:text-gray-600 transition-colors">Terms of Service</button>
            <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;