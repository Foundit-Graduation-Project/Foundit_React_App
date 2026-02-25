import { Link } from "react-router-dom";
import { Home, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegisterNav from "../../components/layout/customNavbars/registerNav";
import HeroIllustration from "./NotFoundComponents/HeroIllustration";
import ResetPasswordFooter from "../../components/layout/customFooters/resetPasswordFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <RegisterNav />

      <main className="grow flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-50/60 rounded-full blur-3xl -z-10 animate-pulse" />

        <HeroIllustration />

        {/* Text Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-9xl font-black tracking-tighter bg-linear-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent leading-none mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Lost in Transit?</h2>
          <p className="text-slate-500 max-w-md mb-10 text-lg font-medium leading-relaxed">
            We couldn't find that page, but we're experts at finding things. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
          <Button asChild className="group bg-blue-600 hover:bg-blue-700 h-14 px-8 gap-3 rounded-2xl shadow-[--shadow-blue-glow] transition-all hover:scale-105 active:scale-95">
            <Link to="/">
              <Home size={20} className="group-hover:rotate-12 transition" />
              <span className="text-base font-bold">Return Home</span>
            </Link>
          </Button>
          
  
        </div>

      </main>

      <ResetPasswordFooter />
    </div>
  );
}

