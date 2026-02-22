import React, { useState } from 'react'
import { Checkbox } from '../../ui/checkbox';
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from '../../ui/button';

export default function PrivacyFooter({ setOpen }) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [gdprAgreed, setGdprAgreed] = useState(false);

  return (
    <DialogFooter className="flex flex-col p-0 bg-slate-50/50 border-t border-slate-100 sm:flex-col">
      
      <div className="px-8 py-6 w-full">
        <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4 shadow-xsm">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="data-terms" 
              checked={termsAgreed}
              onCheckedChange={setTermsAgreed}
              className="w-5 h-5 border-slate-200 data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="data-terms" className="text-xs font-medium text-slate-500 cursor-pointer select-none">
              I have read and understood the data collection terms.
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="gdpr" 
              checked={gdprAgreed}
              onCheckedChange={setGdprAgreed}
              className="w-5 h-5 border-slate-200 data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="gdpr" className="text-xs font-medium text-slate-500 cursor-pointer select-none">
              I acknowledge my rights under GDPR and CCPA.
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 px-8 pb-6 w-full">
        <button 
          onClick={() => setOpen(false)}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
        >
          Cancel
        </button>
        <Button
          disabled={!termsAgreed || !gdprAgreed}
          onClick={() => setOpen(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-lg font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
        >
          Accept & Close
        </Button>
      </div>
    </DialogFooter>
  )
}