import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Import,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TypeIt from "typeit-react";
import HoldUpAnimated from "./HoldUpAnimate";
import SupportModel from "./SupportModel";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyAccount() {
  // const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center">
      <header className="w-full flex items-center justify-between p-6 bg-transparent">
        <div className="flex items-center gap-2  font-bold text-xl ">
          <ShieldCheck className="h-7 w-7 text-black" />
          <span>Security Portal</span>
        </div>

        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 pb-20">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-sm p-10 text-center space-y-8">
          <div className="mx-auto w-16 h-16 bg-[#eef4ff] rounded-2xl flex items-center justify-center">
            <Mail className="h-8 w-8 text-red-500" />
          </div>

          <div className="space-y-2">
            <h1
              className="text-3xl font-bold text-slate-900 animate-shake"
              id="asyncExec"
            >
              <HoldUpAnimated />
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              We've sent a 6-digit verification code to <br />
              <span className="font-semibold text-slate-900">
                EX:esmailebrahim@gmail.com
              </span>
              . Enter the code below to continue.
            </p>
          </div>

          {/*  OTP */}
          <div className="flex justify-center py-2">
            {/* // in case we need ti make it auto  */}
            {/* <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val)}
              render={({ slots }) => (
                <InputOTPGroup className="gap-3">
                  {slots.map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      {...slot}
                      className="w-12 h-14 text-xl font-bold rounded-xl border-slate-200 bg-white"
                    />
                  ))}
                </InputOTPGroup>
              )}
            /> */}
            {/* manual */}
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button className="w-full h-14 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-2xl text-lg group ">
            Verify Account
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="space-y-4">
            <p className="text-slate-500 text-sm">
              Didn't receive the email?
              <button className="text-[#1d63ed] font-bold ml-1 hover:underline">
                Resend code
              </button>
              <span className="ml-2 bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-400 font-bold">
                IN 0:59
              </span>
            </p>

            <Link
              to="/login"
              className="flex items-center justify-center text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to sign in
            </Link>
          </div>
        </div>
      </main>
      {/* calling support model */}
      <footer>
        <div>
          <button
            className="cursor-pointer p-5"
            onClick={() => setIsModalOpen(true)}
          >
            Need help?
          </button>
          <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
      </footer>
    </div>
  );
}

export default VerifyAccount;
