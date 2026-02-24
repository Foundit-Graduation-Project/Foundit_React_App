import React from 'react'
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function PrivacyHeader({ setOpen }) { 
  return (
    <div className="p-8 pb-6 bg-white">
      <div className="flex items-center justify-between mb-1">
        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Privacy Policy
        </DialogTitle>
        <button 
          onClick={() => setOpen(false)}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
        >
        </button>
      </div>
      
       <div className="text-xs font-medium text-slate-400 mb-6">
             Version 1.0 • Last updated: Jan 24, 2026
           </div>

      <DialogDescription className="text-[13px] leading-relaxed text-slate-500">
        This Privacy Policy describes how your personal information is collected, used, 
        and shared when you visit or make a purchase from our site. We are committed to 
        protecting your personal data and your right to privacy.
      </DialogDescription>
    </div>
  )
}