import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, PlusCircle, LayoutDashboard, User } from "lucide-react";
import { Link } from "react-router-dom";
import SupportModel from "../Auth/SupportModel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/authSelectors";
import StartHeroText from "./StartHeroText";
import TermsOfServicePopup from "../../components/popups/TermsOfServicePopup";
import PrivacyPolicyPopup from "../../components/popups/PrivacyPolicyPopup";

import MovingBackground from "../../components/background/MovingBackground";

const GetStart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <MovingBackground />

      {/* Page Content Wrapper with higher z-index */}
      <div className="relative z-10">
        <div className="w-full relative">
          <nav className="fixed top-3 left-0 right-0 z-50 w-[95%] lg:w-4/5 mx-auto px-4 py-4 bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md">
                  <Search className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg md:text-xl text-white">
                  Foundit
                </span>
              </div>
            </div>


            <div className="flex items-center gap-4 md:gap-8">
              {
                localStorage.getItem("user") &&

                <Button
                  variant="ghost"
                  className="cursor-pointer text-white text-sm md:text-base px-2 md:px-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  Support
                </Button>
              }
              <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
              <Link to={isAuthenticated ? "/profile" : "/Login"}>
                <Button className="bg-[#1d63ed] hover:bg-blue-700 text-white rounded-xl px-4 md:px-6 font-bold h-9 md:h-11 text-sm md:text-base flex items-center gap-2">
                  {isAuthenticated ? (
                    <>
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                      Profile
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 lg:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {isAuthenticated ? (
                  <>
                    Welcome Back, <br className="hidden md:block" />
                    <span className="text-[#1d63ed]">{user?.firstName || user?.name || "Member"}!</span>
                  </>
                ) : (
                  <>
                    Reconnecting <br className="hidden md:block" />
                    You With{" "}
                    <span className="text-[#1d63ed]">
                      What <br className="hidden md:block" /> Matters.
                    </span>
                  </>
                )}
              </h1>

              <div className="max-w-lg mx-auto lg:mx-0">
                <StartHeroText />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to={isAuthenticated ? "/home" : "/register"}>
                <Button className="w-full sm:w-auto bg-[#1d63ed] hover:bg-blue-700 text-white rounded-2xl h-14 px-8 text-lg font-bold flex items-center justify-center gap-2 group shadow-lg shadow-blue-200">
                  {isAuthenticated ? "Explore Feed" : "Get Started"}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/create-report" : "/login"}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl h-14 px-8 text-lg font-bold shadow-sm flex items-center justify-center gap-2"
                >
                  {isAuthenticated ? (
                    <>
                      <PlusCircle className="h-5 w-5" />
                      Create Report
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 shadow-sm"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Trusted by <span className="font-bold text-slate-900 dark:text-white">+1000</span>{" "}
                community members
              </p>
            </div>
          </div>
        </main>
        <section className="relative py-24 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-inner dark:shadow-none border-t dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header Section */}
            <div className="text-center space-y-4 mb-20">
              <h3 className="text-[#1d63ed] font-bold uppercase tracking-widest text-sm">
                About Us
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight max-w-3xl mx-auto">
                Building safer, more connected communities through technology.
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: Our Mission */}
              <div className="p-10 rounded-[32px] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 space-y-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#1d63ed] dark:text-blue-400 group-hover:bg-[#1d63ed] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Building safer, more connected communities through technology.
                  We empower people to help one another efficiently.
                </p>
              </div>

              {/* Feature 2: How it Works */}
              <div className="p-10 rounded-[32px] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 space-y-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#1d63ed] dark:text-blue-400 group-hover:bg-[#1d63ed] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  How it Works
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Simple reporting and AI-driven matching. Our system identifies
                  matches between lost and found items in real-time.
                </p>
              </div>

              {/* Feature 3: Community First */}
              <div className="p-10 rounded-[32px] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 space-y-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#1d63ed] dark:text-blue-400 group-hover:bg-[#1d63ed] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Community First
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Designed for universities, compounds, and organizations. A
                  tailored experience for closed and open groups.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer className="w-full py-4 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <p>© 2026 Foundit</p>

            <div className="flex gap-4">
              <button onClick={() => setTermsOpen(true)} className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => setPrivacyOpen(true)} className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setIsModalOpen(true)} className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact Support</button>
            </div>
            <SupportModel isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
            <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GetStart;
