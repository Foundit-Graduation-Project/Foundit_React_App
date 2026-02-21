import { ArrowRight, Lock, Mail, User } from "lucide-react";
import RegisterNav from "./../../components/layout/customNavbars/registerNav";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import PasswordStrengthBar from "../../features/auth/component/PasswordStrengthBar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterFooter from "../../components/layout/customFooter/registerFooter";

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
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Registration successful!");
  };

  return (
    <>
      <RegisterNav />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-3xl text-slate-800">
                Join the Community
              </h2>
              <p className="text-slate-500 mb-8 text-base">
                Start reporting or finding lost items today.
              </p>
            </div>

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
              <PasswordStrengthBar password={watch("password")} />

              {/* Terms Checkbox */}
              <div className="flex flex-col gap-2 items-start">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="accent-blue-600"
                  />
                  I agree to the
                  <a href="" className="text-blue-600">
                    Terms of Services
                  </a>
                  and
                  <a href="" className="text-blue-600">
                    Privacy Policy
                  </a>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms.message}</p>
                )}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
              >
                Create Account <ArrowRight />
              </Button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 font-semibold">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <RegisterFooter />
    </>
  );
}
