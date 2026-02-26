import { ShieldCheck, Handshake, Mail, Share2, Flag, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function ReportSidebar( ) {
  return (
    <div className="space-y-6 font-sans">
      {/* CARD 1: Found This Item? */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Found this item?</h3>
        <p className="text-sm text-slate-500 mb-6">Help return this item to its owner safely.</p>
        
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-[#1d61f2] hover:bg-blue-700 h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2">
            <Handshake size={20} /> I Found This
          </Button>
          <Button variant="ghost" className="w-full bg-[#f1f5f9] hover:bg-slate-200 h-14 rounded-lg text-base font-bold text-slate-900 flex items-center justify-center gap-2">
            <Mail size={20} /> Contact Owner
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-50 flex justify-center">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            <Flag size={18} /> Report
          </button>
        </div>
      </div>

      {/* CARD 2: Reported By */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6">REPORTED BY</p>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-100">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-lg leading-tight">
              James Wilson <CheckCircle2 size={16} className="text-blue-500 fill-white" />
            </h4>
            <p className="text-xs text-slate-400 font-medium">Joined March 2022</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center">
            <p className="text-2xl font-black text-blue-600">48</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Activity Score</p>
          </div>
          <div className="text-center border-l border-slate-100">
            <p className="text-2xl font-black text-slate-800">98%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Helpfulness</p>
          </div>
        </div>

        <div className="w-full py-2.5 rounded-full bg-[#f0fdf4] text-[#16a34a] text-xs font-bold flex items-center justify-center gap-2 border border-green-100">
          <ShieldCheck size={16} /> Highly Trusted Reporter
        </div>
      </div>
    </div>
  );
}