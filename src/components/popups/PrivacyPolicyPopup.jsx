import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {  Database, Activity, Scale, Cookie, Mail } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import PrivacyFooter from './../layout/customFooters/privacyFooter';
import PrivacyHeader from './../layout/customNavbars/privacyHeader';

export default function PrivacyPolicyPopup({ open, setOpen }) {
 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="max-w-xl h-[90vh] p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-white z-50">
        
     <PrivacyHeader />
        {/* Accordion Content Area */}
        <div className="px-8 pb-4 max-h-[45vh] overflow-y-auto custom-scrollbar">
          <Accordion type="single" collapsible className="w-full space-y-2">
            
            {/* 1. Data Collection */}
            <AccordionItem value="item-1" className="border-b border-slate-50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Database size={18} />
                  <span className="font-bold text-slate-800 text-sm">1. Data Collection</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-slate-500 leading-relaxed pl-7">
                We collect information you provide directly to us, which may include:
                <ul className="mt-3 space-y-2 list-disc list-inside marker:text-slate-300">
                  <li>Personal identifiers (name, email address, phone number).</li>
                  <li>Account credentials and security information.</li>
                  <li>Payment information for transactions.</li>
                  <li>Communications you send to our support team.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 2. How We Use Data */}
            <AccordionItem value="item-2" className="border-b border-slate-50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Activity size={18} />
                  <span className="font-bold text-slate-800 text-sm">2. How We Use Your Data</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-slate-500 pl-7">
                We use your data to provide, maintain, and improve our services, as well as to 
                process transactions and send related information.
              </AccordionContent>
            </AccordionItem>

            {/* 3. Rights & Choices */}
            <AccordionItem value="item-3" className="border-b border-slate-50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Scale size={18} />
                  <span className="font-bold text-slate-800 text-sm">3. Your Rights & Choices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-slate-500 pl-7">
                Depending on your location, you may have the right to access, correct, or delete 
                your personal information.
              </AccordionContent>
            </AccordionItem>

            {/* 4. Cookies */}
            <AccordionItem value="item-4" className="border-b border-slate-50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Cookie size={18} />
                  <span className="font-bold text-slate-800 text-sm">4. Cookies & Tracking</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-slate-500 pl-7">
                We use cookies and similar tracking technologies to track the activity on our 
                Service and hold certain information.
              </AccordionContent>
            </AccordionItem>

            {/* 5. Contact Us */}
            <AccordionItem value="item-5" className="border-none">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Mail size={18} />
                  <span className="font-bold text-slate-800 text-sm">5. Contact Us</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-slate-500 pl-7 pb-4">
                If you have questions about this policy, please contact us at support@example.com.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <PrivacyFooter setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}