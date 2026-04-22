import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Send, Clock, Loader2 } from "lucide-react";
import { supportApi } from "../../services/support.api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat, fetchConversations } from "../../features/chat/chatSlice";

const supportSchema = z.object({
  subject: z.string().min(1, "Please select a subject"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function SupportModel({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: "Profile Issues",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await supportApi.openSupportTicket(data.message, data.subject, data.email);
      const newConvoId = res?.data?.conversationId || res?.conversationId;
      
      reset();
      setIsOpen(false);

      if (user) {
        // If logged in, navigate directly to the chat
        if (newConvoId) {
            dispatch(setActiveChat(newConvoId));
            dispatch(fetchConversations()); // Refresh sidebar
        }
        navigate("/chat");
      } else {
        // If guest, show popup
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Our team will respond to you within 24 hours.",
          confirmButtonColor: "#1d63ed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: typeof error === "string" ? error : "An unexpected error occurred. Please try again later.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[500px] rounded-[24px] p-8 gap-6 border-none shadow-2xl">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Support
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Get help with your community profile
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Subject</label>
            <div className="relative">
              <select
                {...register("subject")}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="Profile Issues">Profile Issues</option>
                <option value="Account Access">Account Access</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Send className="h-4 w-4 rotate-90" />
              </div>
            </div>
            {errors.subject && (
              <p className="text-[10px] text-red-500 font-medium px-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              Your Email Address
            </label>
            <Input
              {...register("email")}
              placeholder="email@example.com"
              className="h-12 rounded-xl border-slate-200 bg-slate-50/50"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-medium px-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">
              Message Details
            </label>
            <Textarea
              {...register("message")}
              placeholder="Describe your issue or question in detail..."
              className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/50 "
            />
            {errors.message && (
              <p className="text-[10px] text-red-500 font-medium px-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock className="h-4 w-4" />
            <span>Our team typically responds within 24 hours.</span>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-500 font-medium hover:bg-transparent hover:text-slate-700"
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
