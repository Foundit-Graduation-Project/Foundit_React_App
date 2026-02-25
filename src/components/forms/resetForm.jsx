import React from 'react'
import  { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Check,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrengthBar from "../../features/auth/component/PasswordStrengthBar";
export default function ResetForm() {
    const resetSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9!@#$%^&*]/, "Must contain a number or special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

    const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Password Reset Success", data);
      setIsLoading(false);
    }, 2000);
  };

  const requirements = [
    { label: "At least 6 characters", met: passwordValue.length >= 6 },
    {
      label: "At least one uppercase letter",
      met: /[A-Z]/.test(passwordValue),
    },
    {
      label: "Contains a number or special character",
      met: /[0-9!@#$%^&*]/.test(passwordValue),
    },
  ];

  
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12"
                  {...register("email")}
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  {...register("password")}
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  {...register("confirmPassword")}
                />
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.confirmPassword.message}
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
                    className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${
                      req.met ? "bg-green-100" : "bg-slate-100"
                    }`}
                  >
                    {req.met ? (
                      <Check
                        size={12}
                        className="text-green-600 stroke-[3px]"
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <span
                    className={`transition-colors duration-300 ${req.met ? "text-slate-900 font-medium" : "text-slate-400"}`}
                  >
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold mt-4"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
    </div>
  )
}
