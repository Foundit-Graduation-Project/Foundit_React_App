import { Target, Key, HelpCircle } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative mb-16 group">
      <div className="absolute inset-5 rounded-full border border-blue-100 animate-[scan_15s_linear_infinite_reverse]" />
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-scan" />
      
        <div className="w-60 h-60 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center relative border border-white/60 shadow-[--shadow-glass]">
          <div className="absolute inset-5 rounded-full border border-blue-100 animate-[scan_15s_linear_infinite_reverse]" />
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-scan" />
          
          <div className="w-60 h-60 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center relative border border-white/60 shadow-[--shadow-glass]">
            <Target size={85} className="text-blue-600 animate-bounce transition-transform duration-700 group-hover:scale-110" />
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-4 bg-white p-3 shadow-xl rounded-2xl border border-slate-50 animate-float">
              <Key size={30} className="text-amber-500" />
            </div>
            <div className="absolute bottom-2 -left-6 bg-white p-3 shadow-xl rounded-2xl border border-slate-50 animate-float-reverse">
              <HelpCircle size={30} className="text-slate-400" />
            </div>
          </div>
        </div>
    </div>
  );
}
