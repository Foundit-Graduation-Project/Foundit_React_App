import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Clock } from "lucide-react";
function SupportModel({ isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[500px] rounded-[24px] p-8 gap-6 border-none shadow-2xl">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Registration Assistance
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Get help with your community profile
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Subject</label>
            <select className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
              <option>Select an option</option>
              <option>Profile Issues</option>
              <option>Account Access</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              Your Email Address
            </label>
            <Input
              placeholder="email@example.com"
              className="h-12 rounded-xl border-slate-200 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              Message Details
            </label>
            <Textarea
              placeholder="Describe your issue or question in detail..."
              className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/50 "
            />
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock className="h-4 w-4" />
            <span>Our team typically responds within 24 hours.</span>
          </div>

          <div className="space-y-3 pt-2">
            <Button className="w-full h-12 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Send Message
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-500 font-medium hover:bg-transparent"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SupportModel;
