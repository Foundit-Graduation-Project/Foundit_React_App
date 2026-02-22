import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import {  UserCircle, Gavel,  ShieldAlert, Lock } from "lucide-react";
import TermsNav from './../layout/customNavbars/termsNav';
import TermsFooter from './../layout/customFooters/termsFooter';

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
        
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-xl shadow-2xl bg-white">
        
<TermsNav progress={progress} setOpen={setOpen} />
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

        <TermsFooter agreed={agreed} setAgreed={setAgreed} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}