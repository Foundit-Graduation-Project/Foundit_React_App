import React from 'react'
import {
 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export default function HowItWorkNav() {
  return (
    <div>
      <div className="p-6 md:p-10 pb-0 flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl md:text-3xl font-bold text-slate-800 mb-2">
                      How it Works
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm text-slate-400 max-w-62.5 md:max-w-sm">
                      Getting started with our community platform is simple.
                    </DialogDescription>
                    
                  </div>
                </div>
    </div>
  )
}
