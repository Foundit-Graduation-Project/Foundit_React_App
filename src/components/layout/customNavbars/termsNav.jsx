import React from 'react'
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Added props: progress and setOpen
export default function TermsNav({ progress, setOpen }) {
  return (
    <div className="p-8 pb-4 border-b border-slate-50 bg-white">
      <div className="flex items-center justify-between mb-1">
        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Terms of Service
        </DialogTitle>
        
        {/* Fixed Close Button */}
        <button 
          onClick={() => setOpen(false)}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
        >
        </button>
      </div>
      
      <DialogDescription className="text-xs font-medium text-slate-400 mb-6">
        Version 1.0 • Last updated: Jan 24, 2026
      </DialogDescription>

      {/* Reading Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>Reading progress</span>
          <span className="text-blue-600 transition-all duration-300">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}