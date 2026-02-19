import { Link } from "react-router-dom";
import { CheckCircle2, Download, Plus, CreditCard } from "lucide-react";
import { Button } from "../../components/ui/button";
import PaymentNav from "../../components/layout/customNavbars/PaymentNav";

const PaymentSuccess = () => {

  // Mock data - In the future, this will come from Redux (paymentSlice) via useLocation or useSelector
  const transactionDetails = {
    amount: "$149.00 USD",
    id: "#TXN-88291-00",
    date: "October 24, 2023",
    method: "Visa ending in 4242",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <PaymentNav />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-6 text-sm text-gray-500">
          <span className="text-blue-600 hover:underline cursor-pointer">Billing</span>
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
            <Link to="/app/create-report">
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

          {/* Footer Links */}
          <div className="mt-8 text-xs text-gray-400 flex flex-col gap-2">
            <p>
              Questions? <a href="#" className="text-blue-600 hover:underline">Contact Support</a> or visit our <a href="#" className="text-blue-600 hover:underline">Help Center</a>.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;