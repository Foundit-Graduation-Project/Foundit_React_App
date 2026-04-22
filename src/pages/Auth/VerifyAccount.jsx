import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HoldUpAnimated from "./HoldUpAnimate";
import SupportModel from "../Auth/SupportModel"; // Adjust path if needed
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// --- Integration Imports ---
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTP,
  resendOTP,
  selectUnverifiedEmail,
  selectAuthLoading,
  clearUnverifiedEmail
} from "../../features/auth"; // Adjust path
import toast from "react-hot-toast";

function VerifyAccount() {
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(0); // Cooldown timer for resend

  // --- Hooks ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const email = useSelector(selectUnverifiedEmail);

  // 1. Protection Check: If no email in state, they shouldn't be here
  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [email, navigate]);

  // 2. Timer Countdown Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- Handlers ---
  const handleVerify = async () => {
    if (otp.length !== 6) {
      return toast.error("Please enter the complete 6-digit code.");
    }

    const resultAction = await dispatch(verifyOTP({ email, otp }));

    if (verifyOTP.fulfilled.match(resultAction)) {
      toast.success("Account verified successfully! You can now log in.");
      navigate("/login");
    } else {
      toast.error(resultAction.payload || "Invalid or expired OTP.");
      setOtp(""); // Clear input on fail
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    const resultAction = await dispatch(resendOTP(email));

    if (resendOTP.fulfilled.match(resultAction)) {
      toast.success("A new verification code has been sent!");
      setTimer(60); // Start 60 second cooldown
    } else {
      toast.error(resultAction.payload || "Failed to resend code.");
    }
  };

  const handleBackToLogin = () => {
    dispatch(clearUnverifiedEmail());
    navigate("/login");
  };

  // If email isn't loaded yet, show nothing to prevent flash
  if (!email) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center">

      <header className="w-full flex items-center justify-between p-6 bg-transparent max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
          <span>Security Portal</span>
        </div>

        {/* Since user isn't fully logged in, we show a generic/anonymous avatar */}
        <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
          <AvatarImage src="" />
          <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">?</AvatarFallback>
        </Avatar>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 pb-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 text-center space-y-8">

          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>

          <div className="space-y-3">
            <HoldUpAnimated />
            <p className="text-slate-500 text-sm leading-relaxed">
              We've sent a 6-digit verification code to <br />
              <span className="font-semibold text-slate-900">{email}</span>.
              <br />Enter the code below to continue.
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center py-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val)}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full h-14 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-2xl text-lg group shadow-lg shadow-blue-200 disabled:opacity-70 disabled:shadow-none transition-all"
          >
            {isLoading ? (
              <><Loader2 className="animate-spin w-5 h-5 mr-2" /> Verifying...</>
            ) : (
              <>Verify Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </Button>

          <div className="space-y-6 pt-2">
            <div className="text-slate-500 text-sm flex items-center justify-center gap-2">
              Didn't receive the email?
              <button
                onClick={handleResend}
                disabled={timer > 0 || isLoading}
                className="text-[#1d63ed] font-bold hover:underline disabled:text-slate-400 disabled:no-underline transition-colors"
              >
                Resend code
              </button>
              {timer > 0 && (
                <span className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-500 font-bold tracking-wider">
                  IN 0:{timer.toString().padStart(2, '0')}
                </span>
              )}
            </div>

            <button
              onClick={handleBackToLogin}
              className="flex items-center justify-center text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to sign in
            </button>
          </div>
        </div>
      </main>

      <footer className="pb-8">
        <button
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Need help?
        </button>
        <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </footer>
    </div>
  );
}

export default VerifyAccount;