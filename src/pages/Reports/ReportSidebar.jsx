import {
  ShieldCheck,
  Handshake,
  Mail,
  Share2,
  Flag,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SupportModel from "../Auth/SupportModel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConversationAPI } from "../../features/chat/chatSlice";
import toast from "react-hot-toast";

export default function ReportSidebar({ item }) {
  const [supportOpen, setSupportOpen] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const myUserId = storedUser?._id;
  const owner = item?.user;
  const ownerId = owner?._id || owner;

  const handleContactOwner = async () => {
    if (!myUserId) {
      navigate("/login");
      return;
    }

    if (myUserId === ownerId) {
      toast.error("You cannot chat with yourself.");
      return;
    }

    setIsCreatingChat(true);
    try {
      await dispatch(createConversationAPI(ownerId)).unwrap();
      navigate("/chat");
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <>
      <div className="space-y-6 font-sans">
        {/* CARD 1: Found This Item? */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Found this item?
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Help return this item to its owner safely.
          </p>

          <div className="space-y-3 mb-6">
            <Link to={`/create-report`} className="block">
              <Button className="w-full bg-[#1d61f2] hover:bg-blue-700 h-14 rounded-lg text-base font-bold flex items-center justify-center gap-2">
                <Handshake size={20} /> I Found This
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full bg-[#f1f5f9] hover:bg-slate-200 h-14 rounded-lg text-base font-bold text-slate-900 flex items-center justify-center gap-2"
              onClick={handleContactOwner}
              disabled={isCreatingChat}
            >
              <Mail size={20} />{" "}
              {isCreatingChat ? "Connecting..." : "Contact Owner"}
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-center">
            <button
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setSupportOpen(true)}
            >
              <Flag size={18} /> Report
            </button>
          </div>
        </div>

        {/* CARD 2: Reported By */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6">
            REPORTED BY
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-100">
              <img
                src={
                  owner?.profileImage ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                }
                alt={owner?.name || "Avatar"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-lg leading-tight">
                {owner?.name || "James Wilson"}{" "}
                <CheckCircle2 size={16} className="text-blue-500 fill-white" />
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Joined{" "}
                {owner?.createdAt
                  ? new Date(owner.createdAt).getFullYear()
                  : "2022"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center">
              <p className="text-2xl font-black text-blue-600">48</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Activity Score
              </p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-2xl font-black text-slate-800">98%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Helpfulness
              </p>
            </div>
          </div>

          <div className="w-full py-2.5 rounded-full bg-[#f0fdf4] text-[#16a34a] text-xs font-bold flex items-center justify-center gap-2 border border-green-100">
            <ShieldCheck size={16} /> Highly Trusted Reporter
          </div>
        </div>
      </div>
      <SupportModel isOpen={supportOpen} setIsOpen={setSupportOpen} />
    </>
  );
}
