import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { UserPlus, FileText, Cpu, Info } from "lucide-react";
import StepWork from "./components/stepWork";
import HowItWorkFooter from "./../layout/customFooters/howItWorkFooter";
import HowItWorkNav from "./../layout/customNavbars/howItWorkNav";

export default function HowItWorksPopup({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[60vw] md:max-w-2xl lg:max-w-4xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-white outline-none">
        <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">

          <HowItWorkNav />

          {/* Steps Container */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 p-6 md:p-10 py-10 md:py-16">
            <StepWork
              number="01"
              title="Join Community"
              description="Create your profile in seconds and connect with verified members across your local area."
              icon={UserPlus}
            />
            <StepWork
              number="02"
              title="Post Report"
              description="Share your insights or report issues directly through our streamlined dashboard."
              icon={FileText}
            />
            <StepWork
              number="03"
              title="Smart Match & Connect"
              description="Our AI matches your reports with relevant local experts for rapid resolution."
              icon={Cpu}
              showLine={false}
            />
          </div>

          <HowItWorkFooter setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
