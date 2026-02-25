import React, { useState } from 'react'
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import PasswordStrengthBar from "../../features/auth/component/PasswordStrengthBar";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ArrowRight, Loader2, Lock, Mail, User } from 'lucide-react';
import { Button } from '../ui/button';
import TermsOfServicePopup from '../popups/TermsOfServicePopup';
import PrivacyPolicyPopup from '../popups/PrivacyPolicyPopup';

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50)
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(
        /[0-9!@#$%^&*]/,
        "Password must contain a number or special character",
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
      const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    setTimeout(() => {
      console.log("Account Created:", data);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
         <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="name" className="text-slate-700 font-semibold">
                  Full Name
                </label>
                <Input
                  placeholder="John Doe"
                  id="name"
                  {...register("name")}
                  leadingIcon={<User />}
                  className="text-base py-6"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="email" className="text-slate-700 font-semibold">
                  Email Address
                </label>
                <Input
                  placeholder="name@example.com"
                  id="email"
                  {...register("email")}
                  leadingIcon={<Mail />}
                  className="text-base py-6"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Passwords */}
              <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-2 items-start flex-1">
                  <label
                    htmlFor="password"
                    className="text-slate-700 font-semibold"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="******"
                    id="password"
                    {...register("password")}
                    leadingIcon={<Lock />}
                    className="text-base py-6"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-2 items-start flex-1">
                  <label
                    htmlFor="confirmPassword"
                    className="text-slate-700 font-semibold"
                  >
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="******"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    leadingIcon={<Lock />}
                    className="text-base py-6"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Strength */}
              <PasswordStrengthBar password={watch("password")} mode="segments" />

              {/* Terms Checkbox */}
              <div className="flex flex-col gap-2 items-start">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="
                        data-[state=checked]:bg-blue-600
                        data-[state=checked]:text-white "
                      />
                    )}
                  />
                  <p>
                    I agree to the{" "}
                    <a
                      href=""
                      className="text-blue-600 "
                      onClick={(e) => {
                        e.preventDefault();
                        setTermsOpen(true);
                      }}
                    >
                      Terms of Services
                    </a>{" "}
                    and{" "}
                    <a
                      href=""
                      className="text-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setPrivacyOpen(true);
                      }}
                    >
                      Privacy Policy
                    </a>
                  </p>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms.message}</p>
                )}
              </div>

              {/* Register Button */}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>
            {/* Popups */}
            <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
            <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
            
    </div>
  )
}
