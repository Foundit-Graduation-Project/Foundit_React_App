import React from 'react'
import { DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TermsFooter({ agreed, setAgreed, setOpen }) {
  return (
    <DialogFooter className="flex flex-row items-center justify-between p-6 bg-slate-50/50 border-t border-slate-100 sm:justify-between">
      
      {/* Checkbox Section */}
      <div className="flex flex-1 items-center space-x-2">
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

      {/* Buttons Section */}
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
  )
}