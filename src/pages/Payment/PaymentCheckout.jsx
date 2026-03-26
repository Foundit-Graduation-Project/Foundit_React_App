// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   ShieldCheck, Lock,
//   Search,
//   User,
//   Settings as SettingsIcon, Bell, LogOut
// } from "lucide-react";
// import { currentUser } from "../../components/chat/mockData";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Separator } from "../../components/ui/separator";
// import SupportModel from "../Auth/SupportModel";
// import TermsOfServicePopup from "../../components/popups/TermsOfServicePopup";
// import PrivacyPolicyPopup from "../../components/popups/PrivacyPolicyPopup";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCheckoutSession, clearPaymentError, selectPaymentLoading, selectPaymentError, selectPaymentSessionUrl } from "../../features/payment";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";

// // --- Validation Schema ---
// const checkoutSchema = z.object({
//   fullName: z.string().min(2, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   cardHolder: z.string().min(2, "Cardholder name is required"),
//   cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
//   expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid format (MM/YY)"),
//   cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
// });

// const PaymentCheckout = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [termsOpen, setTermsOpen] = useState(false);
//   const [privacyOpen, setPrivacyOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectPaymentLoading);
//   const error = useSelector(selectPaymentError);
//   const sessionUrl = useSelector(selectPaymentSessionUrl);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(checkoutSchema),
//   });

//   useEffect(() => {
//     if (sessionUrl) {
//       window.location.href = sessionUrl; // Redirect to Stripe Checkout
//     }
//   }, [sessionUrl]);

//   const onSubmit = async (data) => {
//     dispatch(clearPaymentError());
//     try {
//       await dispatch(createCheckoutSession({ plan: 'Custom', amount: 20 })).unwrap();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert(err || "An error occurred while initializing payment.");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 pb-12">

//         {/* --- Header: Full Width --- */}
//         <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-50">
//           <div className="w-full flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
//                 <Search className="w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold text-gray-900 tracking-tight">Foundit</span>
//             </div>
//             {/* User Avatar */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button className="flex items-center gap-3 hover:bg-slate-50 p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
//                   <div className="hidden sm:flex flex-col items-end">
//                     <span className="text-sm font-semibold leading-tight text-slate-900">{currentUser.name}</span>
//                     <span className="text-xs text-slate-500">{currentUser.role}</span>
//                   </div>
//                   <Avatar className="w-9 h-9 border border-slate-100 shadow-sm">
//                     <AvatarImage src={currentUser?.avatarUrl} alt={currentUser.name} />
//                     <AvatarFallback className={`font-medium ${currentUser.color}`}>
//                       {currentUser.initials}
//                     </AvatarFallback>
//                   </Avatar>
//                 </button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none text-slate-900">{currentUser.name}</p>
//                     <p className="text-xs leading-none text-slate-500">alex.rivera@example.com</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem className="cursor-pointer">
//                     <Link to="/profile" className="flex items-center w-full">
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="cursor-pointer">
//                     <Link to="/settings" className="flex items-center w-full">
//                       <SettingsIcon className="mr-2 h-4 w-4" />
//                       <span>Settings</span>
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="cursor-pointer">
//                     <Link to="/notifications" className="flex items-center w-full">
//                       <Bell className="mr-2 h-4 w-4" />
//                       <span>Notifications</span>
//                     </Link>
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
//                   <LogOut className="mr-2 h-4 w-4" /><span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* --- Main Content: Full Width --- */}
//         <div className="w-full px-6 md:px-10 pt-10">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//             <div className="lg:col-span-8 space-y-8">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
//                 <p className="text-gray-500 mt-2">Complete your details to refill your credits.</p>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

//                 {/* Section 1: Billing Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
//                     <h3 className="text-lg font-bold text-gray-900">Billing Information</h3>
//                   </div>

//                   <div className="space-y-4 pl-11">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Full Name</label>
//                       <Input
//                         placeholder="John Doe"
//                         {...register("fullName")}
//                         className={errors.fullName ? "border-red-500" : ""}
//                       />
//                       {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Email Address</label>
//                       <Input
//                         placeholder="john@example.com"
//                         {...register("email")}
//                         className={errors.email ? "border-red-500" : ""}
//                       />
//                       {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Section 2: Payment Method */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
//                       <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-gray-400">
//                       <Lock className="w-3 h-3" /> SECURED BY STRIPE
//                     </div>
//                   </div>

//                   <div className="pl-11 space-y-4">

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
//                       <Input
//                         placeholder="Name on card"
//                         {...register("cardHolder")}
//                         className={errors.cardHolder ? "border-red-500" : ""}
//                       />
//                     </div>

//                     <div className="space-y-2 relative">
//                       <label className="text-sm font-medium text-gray-700">Card Number</label>
//                       <div className="relative">
//                         <Input
//                           placeholder="0000 0000 0000 0000"
//                           {...register("cardNumber")}
//                           className={`pl-4 pr-10 ${errors.cardNumber ? "border-red-500" : ""}`}
//                         />
//                         <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       </div>
//                       {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
//                         <Input
//                           placeholder="MM / YY"
//                           {...register("expiry")}
//                           className={errors.expiry ? "border-red-500" : ""}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">CVC</label>
//                         <Input
//                           placeholder="123"
//                           {...register("cvc")}
//                           className={errors.cvc ? "border-red-500" : ""}
//                         />
//                       </div>
//                     </div>

//                     {/* Payment Icons */}
//                     <div className="flex gap-2 pt-2 opacity-60 grayscale">
//                       <div className="w-8 h-5 bg-gray-200 rounded"></div>
//                       <div className="w-8 h-5 bg-gray-200 rounded"></div>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="pl-11 pt-4">
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting || isLoading}
//                     className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200"
//                   >
//                     {isSubmitting || isLoading ? "Processing..." : (
//                       <span className="flex items-center gap-2">
//                         <ShieldCheck className="w-5 h-5" /> Complete Secure Purchase
//                       </span>
//                     )}
//                   </Button>
//                   <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
//                     Your transaction is encrypted with 256-bit SSL security. By completing your purchase, you agree to our Terms of Service.
//                   </p>
//                 </div>

//               </form>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="sticky top-28 space-y-6">

//                 {/* Trust Badge */}
//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
//                   <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
//                     <ShieldCheck className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-blue-900 font-bold text-sm">Safe & Secure</h4>
//                     <p className="text-blue-700 text-xs">PCI-DSS Compliant Payment</p>
//                   </div>
//                 </div>

//                 {/* Summary Card */}
//                 <Card className="shadow-sm border-gray-200">
//                   <CardHeader className="pb-4">
//                     <CardTitle className="text-lg">Order Summary</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">

//                     {/* Item Details */}
//                     <div className="flex justify-between items-baseline">
//                       <div>
//                         <h4 className="font-bold text-gray-900 text-lg">Refilling credits</h4>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-blue-600 font-bold text-xl">$19.99</span>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* Calculation */}
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between text-gray-500">
//                         <span>VAT / Tax (0%)</span>
//                         <span>$0.00</span>
//                       </div>
//                       <div className="flex justify-between text-green-600 font-medium">
//                         <span>Discount (PRO20)</span>
//                         <span>-$10.00</span>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* Total */}
//                     <div className="flex justify-between items-center pt-2">
//                       <span className="font-bold text-gray-900">Total Amount</span>
//                       <span className="font-bold text-gray-900 text-2xl">$9.99</span>
//                     </div>

//                   </CardContent>
//                 </Card>

//               </div>
//             </div>

//           </div>
//         </div>


//       </div>
//       <footer className="w-full py-4 border-t border-slate-100 bg-white/50">
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[11px] font-medium text-slate-400">
//           <p>© 2026 Foundit</p>

//           <div className="flex gap-4">
//             <button onClick={() => setTermsOpen(true)} className="hover:text-gray-900 transition-colors">Terms of Service</button>
//             <button onClick={() => setPrivacyOpen(true)} className="hover:text-gray-900 transition-colors">Privacy Policy</button>
//             <button onClick={() => setIsModalOpen(true)} className="hover:text-gray-900 transition-colors">Contact Support</button>
//           </div>
//           <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
//           <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
//           <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
//         </div>
//       </footer>
//     </>
//   );
// };

// export default PaymentCheckout;








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
    { id: 'Premium', name: 'Premium Plan', price: 200, credits: 10, desc: 'Best value for frequent users.' },
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