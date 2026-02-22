import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ShieldCheck, Lock
} from "lucide-react";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

// --- Validation Schema ---
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  cardHolder: z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid format (MM/YY)"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

const PaymentCheckout = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/payment/success");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">

      {/* --- Header: Full Width --- */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">FinTrack Pro</span>
          </div>
        </div>
      </header>

      {/* --- Main Content: Full Width --- */}
      <div className="w-full px-6 md:px-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
              <p className="text-gray-500 mt-2">Complete your details to refill your credits.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Section 1: Billing Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-lg font-bold text-gray-900">Billing Information</h3>
                </div>

                <div className="space-y-4 pl-11">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      {...register("fullName")}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      placeholder="john@example.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                    <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Lock className="w-3 h-3" /> SECURED BY STRIPE
                  </div>
                </div>

                <div className="pl-11 space-y-4">

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
                    <Input
                      placeholder="Name on card"
                      {...register("cardHolder")}
                      className={errors.cardHolder ? "border-red-500" : ""}
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <div className="relative">
                      <Input
                        placeholder="0000 0000 0000 0000"
                        {...register("cardNumber")}
                        className={`pl-4 pr-10 ${errors.cardNumber ? "border-red-500" : ""}`}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                      <Input
                        placeholder="MM / YY"
                        {...register("expiry")}
                        className={errors.expiry ? "border-red-500" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CVC</label>
                      <Input
                        placeholder="123"
                        {...register("cvc")}
                        className={errors.cvc ? "border-red-500" : ""}
                      />
                    </div>
                  </div>

                  {/* Payment Icons */}
                  <div className="flex gap-2 pt-2 opacity-60 grayscale">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>

                </div>
              </div>

              <div className="pl-11 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200"
                >
                  {isSubmitting ? "Processing..." : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" /> Complete Secure Purchase
                    </span>
                  )}
                </Button>
                <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
                  Your transaction is encrypted with 256-bit SSL security. By completing your purchase, you agree to our Terms of Service.
                </p>
              </div>

            </form>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">

              {/* Trust Badge */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-blue-900 font-bold text-sm">Safe & Secure</h4>
                  <p className="text-blue-700 text-xs">PCI-DSS Compliant Payment</p>
                </div>
              </div>

              {/* Summary Card */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Item Details */}
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Refilling credits</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-600 font-bold text-xl">$19.99</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Calculation */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>VAT / Tax (0%)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount (PRO20)</span>
                      <span>-$10.00</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-gray-900 text-2xl">$9.99</span>
                  </div>

                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>

      <footer className="w-full px-6 md:px-10 mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2024 FinTrack Pro. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Help Center</a>
        </div>
      </footer>

    </div>
  );
};

export default PaymentCheckout;