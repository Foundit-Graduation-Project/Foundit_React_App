import React, { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../../features/auth';
import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Facebook,
  EyeOff,
  Search,
  Loader2 // <-- Added for loading spinner
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import TypeIt from "typeit-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

// --- Integration Imports ---
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser, selectAuthLoading } from "../../features/auth";

// --- 1. Zod Validation Schema ---
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // tokenResponse.access_token is what we send to our backend
      const resultAction = await dispatch(loginWithGoogle(tokenResponse.access_token));

      if (loginWithGoogle.fulfilled.match(resultAction)) {
        const isNewUser = resultAction.payload.isNewUser;

        if (isNewUser) {
          toast.success("Account created successfully! Welcome to FoundIt.");
        } else {
          toast.success("Welcome back!"); // Or just "Welcome back!"
        }
        navigate("/home");
      } else {
        toast.error(resultAction.payload || "Google Login failed.");
      }
    },
    onError: () => toast.error("Google login popup closed or failed."),
  });

  // --- 2. Redux & Navigation ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading); // Get loading state from Redux

  // --- 3. Form Setup ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- 4. Submit Handler ---
  const onSubmit = async (data) => {
    // data contains { email, password }
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Welcome back!");
      navigate("/home"); // Redirect to the Home Feed!
    } else {
      toast.error(resultAction.payload || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8faff]">
      <Card className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-none shadow-2xl">

        {/* --- LEFT PART (Visuals) --- */}
        <div className="bg-[#eef4ff] p-10 hidden md:flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 animate-bounce animate-infinite animate-duration-[2000ms] animate-ease-in-out animate-alternate">
              <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900">FoundIt</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Reconnecting you <br />
                <span className="text-[#1d63ed]">with what matters.</span>
              </h2>
              <p className="text-slate-500 text-lg">
                Helping thousands of people find their precious belongings every single day.
              </p>
            </div>
          </div>

          <div className="bg-white/60 rounded-3xl p-2">
            <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 overflow-hidden">
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source src="/videos/loginVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* --- RIGHT PART (Form) --- */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <CardHeader className="p-0 mb-8 flex content-center text-center w-full">
            <CardTitle className="text-3xl font-bold text-slate-900 h-10">
              <TypeIt
                options={{
                  strings: [
                    "Lost something?",
                    "Found something?",
                    "We help you find it.",
                  ],
                  speed: 100,
                  waitUntilVisible: true,
                  breakLines: false,
                  loop: true,
                }}
              />
            </CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Login to track your lost item or report a find.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-6">

            {/* Form Tag with handleSubmit */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
              <div className="space-y-2 text-left">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="EX.@gmail.com"
                    {...register("email")}
                    className={`pl-10 h-12 rounded-xl focus-visible:ring-[#1d63ed] ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password">
                    <Button type="button" variant="link" className="p-0 h-auto text-[#1d63ed] font-bold">
                      Forgot Password?
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`pl-10 h-12 rounded-xl pr-10 focus-visible:ring-[#1d63ed] ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3.5 h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox id="remember" className="rounded-md border-slate-300 data-[state=checked]:bg-[#1d63ed]" />
                <Label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">
                  Remember Me
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-2xl text-lg shadow-lg shadow-blue-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Social Login Separator */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-bold">
                  OR SIGN IN WITH
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Social Buttons */}
              <Button
                type="button"
                variant="outline"
                onClick={() => googleLogin()}
                className="h-12 rounded-xl border-slate-200 font-semibold hover:bg-slate-50 w-full"
              >
                <Mail className="text-red-500 mr-2 h-5 w-5" />
                Google
              </Button>
            </form>
          </CardContent>

          <footer className="mt-6 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Don't have an account?
              <Link to="/register" className="text-[#1d63ed] font-bold p-1 hover:underline ml-1">
                Sign up for free
              </Link>
            </p>
          </footer>
        </div>
      </Card>
    </div>
  );
};

export default Login;