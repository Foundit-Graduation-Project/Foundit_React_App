import { Info } from 'lucide-react'
import { Button } from '../../ui/button'

export default function HowItWorkFooter({setOpen}) {
  return (
    <div>
     
          <div className="px-6 md:px-10 py-6 md:py-8 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-medium">
              <Info size={14} />
              <span>Available for all registered members</span>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button 
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 md:py-6  font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Got it, let's go
              </Button>
            </div>
          </div>
          
    </div>
  )
}
