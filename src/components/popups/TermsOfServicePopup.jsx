import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {  ShieldCheck, UserCircle, Gavel, ArrowRight, ShieldAlert, Lock } from "lucide-react";
import { DialogDescription, DialogOverlay } from "@radix-ui/react-dialog";

export default function TermsOfServicePopup({ open, setOpen }) {
  const [agreed, setAgreed] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  // Handle Dynamic Progress Bar
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(Math.round(scrollPercent), 100));
    }
  };

  // Reset progress when opened
  useEffect(() => {
    if (open) setProgress(0);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogOverlay className="bg-slate-900/40 backdrop-blur-md" />*/}
        
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-xl shadow-2xl bg-white">
        
        {/* Header Section */}
        <div className="p-8 pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-1">
            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Terms of Service
            </DialogTitle>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
            </button>
          </div>
          
          <DialogDescription className="text-xs font-medium text-slate-400 mb-6">
            Version 1.0 • Last updated: Jan 24, 2026
          </DialogDescription>

          {/* Dynamic Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Reading progress</span>
              <span className="text-blue-600 transition-all duration-300">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Area (Scrollable) */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="px-8 py-6 max-h-[50vh] overflow-y-auto custom-scrollbar"
        >
          {/* Section 1 & 2 (Previous Content) */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <Gavel size={18} />
              <h2 className="font-bold text-slate-900">1. Acceptance of Terms</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              By accessing and using this service, you accept and agree to be bound by the terms 
              and provision of this agreement...
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <UserCircle size={18} />
              <h2 className="font-bold text-slate-900">2. User Conduct</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-2">
              Commercial use of the platform is strictly regulated under our separate Business Terms.
            </p>
          </section>

          {/* Section 3: Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <ShieldAlert size={18} />
              <h2 className="font-bold text-slate-900">3. Limitation of Liability</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-500 mb-4">
              To the maximum extent permitted by applicable law, in no event shall the Company be 
              liable for any indirect, punitive, incidental, special, consequential, or exemplary 
              damages, including without limitation damages for loss of profits, goodwill, use, data, 
              or other intangible losses.
            </div>
            
            {/* Quote Block from image */}
            <div className="relative pl-4 py-4 pr-6 bg-blue-50/50 rounded-r-lg border-l-4 border-blue-600 italic text-slate-600 text-sm">
              "The service is provided on an 'as is' and 'as available' basis without any warranties 
              of any kind, whether express or implied."
            </div>
          </section>

          {/* Section 4: Privacy Policy */}
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <Lock size={18} />
              <h2 className="font-bold text-slate-900">4. Privacy Policy</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Your use of the Services is also subject to our <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>. 
              Please review our Privacy Policy, which also governs the Services and informs users 
              of our data collection practices.
            </p>
          </section>
        </div>

        {/* Footer Section */}
        <DialogFooter className="flex flex-row items-center justify-between p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex flex-1 items-center space-x-2 ">
            <Checkbox 
                id="terms" 
                checked={agreed} 
                onCheckedChange={setAgreed}
                className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label 
              htmlFor="terms" 
              className="text-sm font-medium text-slate-400 cursor-pointer select-none"
            >
              I have read and agree to the terms
            </label>
          </div>

          <div className="flex items-center gap-6">
            <button 
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Decline
            </button>
            <Button
              disabled={!agreed}
              onClick={() => setOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-5 rounded-lg flex items-center gap-2 font-semibold shadow-md shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
            >
              Accept Terms <ArrowRight size={16} />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}