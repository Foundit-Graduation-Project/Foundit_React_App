import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";

const GetStart = () => {
  return (
    <div className="min-h-screen bg-[#f8faff] font-sans overflow-x-hidden bg-hero-pattern bg-cover bg-fixed">
      <nav className="w-full px-12 py-6 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2  animate-infinite animate-duration-[2000ms] animate-ease-in-out animate-alternate">
            <div className="bg-[#1d63ed] p-2 rounded-xl animate-pulse">
              <div className="w-5 h-5 border-2 border-white rounded-md " />
              <div />
            </div>
            <span className="font-bold text-xl text-slate-900">FindHub</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Support
          </a>
          <Link to="/Login">
            <Button className="bg-[#1d63ed] hover:bg-blue-700 text-white rounded-xl px-6 font-bold h-11">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-12 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="space-y-4">
            <h1 className="text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Reconnecting <br />
              You With{" "}
              <span className="text-[#1d63ed]">
                What <br /> Matters.
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed pt-2">
              The all-in-one community safety platform for lost items, emergency
              alerts, and social service. Designed to bring peace of mind back
              to your neighborhood.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button className="bg-[#1d63ed] hover:bg-blue-700 text-white rounded-2xl h-14 px-8 text-lg font-bold flex items-center gap-2 group shadow-lg shadow-blue-200">
              Get Started{" "}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="bg-slate-50/50 border-slate-200 hover:bg-white text-slate-900 rounded-2xl h-14 px-8 text-lg font-bold shadow-sm"
            >
              Sign In
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Trusted by{" "}
              <span className="font-bold text-slate-900">10,000+</span>{" "}
              community members
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStart;
