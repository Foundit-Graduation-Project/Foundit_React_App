






import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ShieldCheck, Lock, Search, User, Settings as SettingsIcon, Bell, LogOut, CheckCircle2, CreditCard
} from "lucide-react";
import { currentUser } from "../../components/chat/mockData";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import SupportModel from "../Auth/SupportModel";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckoutSession,
  clearPaymentError,
  selectPaymentLoading,
  selectPaymentSessionUrl
} from "../../features/payment";
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

// Validation Schema for Billing Info
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
});

const PaymentCheckout = () => {
  // Matches your backend logic: Premium (200 EGP / 10 Credits) & Basic (100 EGP / 3 Credits)
  const [selectedPlan, setSelectedPlan] = useState({ id: 'Basic', name: 'Basic Plan', price: 100, credits: 3 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectPaymentLoading);
  const sessionUrl = useSelector(selectPaymentSessionUrl);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: currentUser.name,
      email: "user@example.com" // Replace with actual user email from your Auth state
    }
  });

  // Redirect to Stripe once the session URL is generated
  useEffect(() => {
    if (sessionUrl) {
      window.location.href = sessionUrl;
    }
  }, [sessionUrl]);

  const onSubmit = async (data) => {
    dispatch(clearPaymentError());
    try {
      // Sends plan and amount to your createCheckoutSessionService
      await dispatch(createCheckoutSession({
        plan: selectedPlan.id,
        amount: selectedPlan.price
      })).unwrap();
    } catch (err) {
      console.error("Checkout Error:", err);
      alert(err || "Failed to initialize payment. Please try again.");
    }
  };

  const plans = [
    { id: 'Basic', name: 'Basic Plan', price: 100, credits: 3, desc: 'Perfect for testing our features.' },
    { id: 'Premium', name: 'Premium Plan', price: 300, credits: 10, desc: 'Best value for frequent users.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* --- Header --- */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <Link to="/Home">
              <span className="text-xl font-bold text-gray-900 tracking-tight">Foundit</span>
            </Link>
          </div>


        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="w-full px-6 md:px-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Side: Plans & Billing */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-500 mt-2">Choose a plan to refill your credits instantly.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Step 1: Select Plan */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-lg font-bold text-gray-900">Select Credit Package</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-11">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`cursor-pointer p-5 border-2 rounded-xl transition-all duration-200 ${selectedPlan.id === plan.id
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg">{plan.name}</span>
                        {selectedPlan.id === plan.id ? <CheckCircle2 className="text-blue-600 w-5 h-5" /> : <div className="w-5 h-5 border rounded-full" />}
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                      <div className="text-2xl font-black text-gray-900">
                        {plan.price} <span className="text-sm font-normal text-gray-500">EGP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Billing Confirmation */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-lg font-bold text-gray-900">Billing Information</h3>
                </div>

                <div className="space-y-4 pl-0 md:pl-11">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                      <input

                        placeholder="ismail ibrahim"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                      <input
                        defaultValue="example@gmail.com"
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-allowed"

                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure CTA */}
              <div className="pl-0 md:pl-11 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <ShieldCheck className="w-6 h-6" />Go to Pay {selectedPlan.price} EGP Securely
                    </>
                  )}
                </Button>

                <div className="flex flex-col items-center mt-6 space-y-4">
                  <div className="flex items-center gap-4 opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                    <div className="w-px h-4 bg-gray-400"></div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                      <Lock className="w-3 h-3" /> PCI Compliant
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center max-w-sm">
                    You will be redirected to Stripe to complete your payment. We do not store your card details.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 shadow-xl border-none ring-1 ring-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-white p-5">
                <h3 className="font-bold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Order Summary
                </h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Selected Plan:</span>
                  <span className="font-bold text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Credits to add:</span>
                  <span className="text-blue-600 font-bold">+{selectedPlan.credits} Credits</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal:</span>
                    <span className="text-gray-900 font-medium">{selectedPlan.price}.00 EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT (0%):</span>
                    <span className="text-gray-900 font-medium">0.00 EGP</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg text-gray-900">Total Amount</span>
                  <span className="font-black text-2xl text-blue-600">{selectedPlan.price} EGP</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* Reusable Modals/Popups */}
      <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default PaymentCheckout;