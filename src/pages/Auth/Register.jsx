import {  Info } from "lucide-react";
import RegisterNav from "./../../components/layout/customNavbars/registerNav";
import { Button } from "../../components/ui/button";

import RegisterFooter from "../../components/layout/customFooters/registerFooter";
import { Link } from "react-router-dom";
import HowItWorksPopup from "../../components/popups/HowItWorksPopup";
import { useState } from "react";

import RegisterForm from './../../components/forms/registerForm';

export default function Register() {

  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <>
      <RegisterNav />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-3xl text-slate-800">
                Join the Community
              </h2>
              <p className="text-slate-500 mb-8 text-base">
                Start reporting or finding lost items today.
              </p>
              {/* How it work fire */}
              <Button
                type="button"
                onClick={() => setHowItWorksOpen(true)}
                className="flex items-center gap-1.5  font-semibold bg-transparent hover:bg-transparent hover:text-blue-800 text-blue-600 transition-colors shadow-none "
              >
                <Info
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="cursor-pointer underline-offset-4">
                  See how it works
                </span>
              </Button>
            </div>

         <RegisterForm />

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Popup */}
      <HowItWorksPopup open={howItWorksOpen} setOpen={setHowItWorksOpen} />
      
      <RegisterFooter />
    </>
  );
}
