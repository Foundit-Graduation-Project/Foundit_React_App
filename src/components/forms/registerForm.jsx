import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import PasswordStrengthBar from "../../features/auth/component/PasswordStrengthBar";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ArrowRight, Loader2, Lock, Mail, User, Facebook } from 'lucide-react'; // Added Facebook icon
import { Button } from '../ui/button';
import TermsOfServicePopup from '../popups/TermsOfServicePopup';
import PrivacyPolicyPopup from '../popups/PrivacyPolicyPopup';
import { useState } from 'react';

// --- Google Auth Import ---
import { useGoogleLogin } from '@react-oauth/google';

// --- Redux & Router Imports ---
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser, loginWithGoogle, selectAuthLoading } from '../../features/auth'; // Added loginWithGoogle

// --- 1. Synced Zod Schema (Matches Backend Joi exactly) ---
const registerSchema = z
  .object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50)
      .regex(/[a-zA-Z]/, "Password must contain at least 1 letter")
      .regex(/[0-9]/, "Password must contain at least 1 number"),
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
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // --- 2. Redux & Navigation Hooks ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      terms: false,
    },
  });

  // --- 3. Google Login/Register Hook ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Dispatch the thunk using the token from Google
      const resultAction = await dispatch(loginWithGoogle(tokenResponse.access_token));

      if (loginWithGoogle.fulfilled.match(resultAction)) {
        const isNewUser = resultAction.payload.isNewUser;

        if (isNewUser) {
          toast.success("Account created successfully! Welcome to FoundIt.");
        } else {
          toast.success("Welcome back! You already had an account."); // Or just "Welcome back!"
        }
        navigate("/home"); // Bypass login/verification and go straight to Home!
      } else {
        toast.error(resultAction.payload || "Google Sign-Up failed. Please try again.");
      }
    },
    onError: () => toast.error("Google popup closed or failed."),
  });

  // --- 4. Standard Form Submit Handler ---
  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    const resultAction = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Account created! Please check your email to verify.");
      navigate('/verify-account');
    } else {
      toast.error(resultAction.payload || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Name */}
        <div className="flex flex-col gap-2 items-start text-left">
          <label htmlFor="name" className="text-slate-700 font-semibold">
            Full Name
          </label>
          <Input
            placeholder="John Doe"
            id="name"
            {...register("name")}
            leadingIcon={<User />}
            className={`text-base py-6 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 items-start text-left">
          <label htmlFor="email" className="text-slate-700 font-semibold">
            Email Address
          </label>
          <Input
            placeholder="name@example.com"
            id="email"
            {...register("email")}
            leadingIcon={<Mail />}
            className={`text-base py-6 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Passwords */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-2 items-start flex-1 text-left">
            <label htmlFor="password" className="text-slate-700 font-semibold">
              Password
            </label>
            <Input
              type="password"
              placeholder="******"
              id="password"
              {...register("password")}
              leadingIcon={<Lock />}
              className={`text-base py-6 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start flex-1 text-left">
            <label htmlFor="confirmPassword" className="text-slate-700 font-semibold">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="******"
              id="confirmPassword"
              {...register("confirmPassword")}
              leadingIcon={<Lock />}
              className={`text-base py-6 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Password Strength */}
        <PasswordStrengthBar password={watch("password") || ""} mode="segments" />

        {/* Terms Checkbox */}
        <div className="flex flex-col gap-2 items-start text-left">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                />
              )}
            />
            <p>
              I agree to the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => { e.preventDefault(); setTermsOpen(true); }}
              >
                Terms of Services
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => { e.preventDefault(); setPrivacyOpen(true); }}
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
          disabled={isLoading || !watch("terms")}
          className={`w-full h-12 text-base flex items-center justify-center gap-2 transition-all mt-2 ${!watch("terms")
            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
            }`}
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

        {/* --- NEW: Social Login Separator --- */}
        <div className="relative flex items-center py-2 mt-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
            Or Sign Up With
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* --- NEW: Social Buttons --- */}
        <div className="grid">
          <Button
            type="button" // CRITICAL: Prevents triggering standard form validation
            variant="outline"
            onClick={() => googleLogin()}
            className="h-12 rounded-xl border-slate-200 font-semibold hover:bg-slate-50 shadow-sm transition-colors w-full"
          >
            <Mail className="text-red-500 mr-2 h-5 w-5" /> {/* Use Google Icon if you have one! */}
            Google
          </Button>
        </div>

      </form>

      {/* Popups */}
      <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
      <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
    </div>
  );
}