import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Check, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrengthBar from "../../features/auth/component/PasswordStrengthBar";

// --- Integration Imports ---
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPasswordAPI } from "../../features/auth"; // Adjust path to your barrel file

// --- 1. Zod Schema (Synced with Backend) ---
const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Must contain a letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Hooks ---
  const navigate = useNavigate();
  const { token } = useParams(); // Grabs the /:token from the URL

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    mode: "onChange",
  });

  const passwordValue = watch("newPassword", "");

  // --- 3. Dynamic UI Checklist (Synced with Backend Rules) ---
  const requirements = [
    { label: "At least 8 characters", met: passwordValue.length >= 8 },
    {
      label: "Contains at least one letter",
      met: /[a-zA-Z]/.test(passwordValue),
    },
    {
      label: "Contains a number",
      met: /[0-9]/.test(passwordValue),
    },
  ];

  // --- 4. Submit Handler ---
  const onSubmit = async (data) => {
    if (!token) {
      return toast.error("Invalid reset link. Token is missing.");
    }

    setIsLoading(true);
    try {
      // Call our API utility
      await resetPasswordAPI(token, {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });

      toast.success("Password reset successfully! Please login.");
      navigate("/login"); // Send them back to login page
    } catch (error) {
      toast.error(error || "Failed to reset password. Link might be expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* New Password */}
        <div className="space-y-2 text-left">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`pl-10 pr-10 h-12 focus-visible:ring-[#1d63ed] ${errors.newPassword ? 'border-red-500' : ''}`}
              {...register("newPassword")}
            />
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2 text-left">
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmNewPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`pl-10 h-12 focus-visible:ring-[#1d63ed] ${errors.confirmNewPassword ? 'border-red-500' : ''}`}
              {...register("confirmNewPassword")}
            />
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
          </div>
          {errors.confirmNewPassword && (
            <p className="text-xs text-red-500 font-medium mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Strength Bar */}
        <PasswordStrengthBar password={passwordValue} mode="dynamic" />

        {/* Constraints List */}
        <ul className="space-y-2 pt-2">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm">
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${req.met ? "bg-green-100" : "bg-slate-100"
                  }`}
              >
                {req.met ? (
                  <Check size={12} className="text-green-600 stroke-[3px]" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </div>
              <span
                className={`transition-colors duration-300 ${req.met ? "text-slate-900 font-medium" : "text-slate-400"
                  }`}
              >
                {req.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !requirements.every(req => req.met)} // Added constraint lock
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold mt-4 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} /> Updating...
            </span>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}