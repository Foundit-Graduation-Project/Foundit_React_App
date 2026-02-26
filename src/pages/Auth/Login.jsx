import React from "react";
import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Earth,
  Facebook,
  EyeOff,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import WelcomeText from "./WelcomeText";
import TypeIt from "typeit-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisability = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8faff] ">
      <Card className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#eef4ff] p-10 hidden md:flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 animate-bounce animate-infinite animate-duration-[2000ms] animate-ease-in-out animate-alternate">
              <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900">Foundit</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Reconnecting you <br />
                <span className="text-[#1d63ed]">with what matters.</span>
              </h2>
              <p className="text-slate-500 text-lg">
                Helping thousands of people find their precious belongings every
                single day.
              </p>
            </div>
          </div>

          {/* short video to explain how to log */}
          <div className="bg-white/60 rounded-3xl ">
            <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source src="/videos/loginVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <CardHeader className="p-0 mb-8 flex content-center text-center w-full">
            <CardTitle className="text-3xl font-bold text-slate-900">
              <TypeIt
                options={{
                  strings: [
                    "Lost something?",
                    "Found something?",
                    "We help you find it.",
                  ],
                  speed: 100,
                  waitUntilVisible: true,
                  breakLines: false, // عشان يمسح السطر ويكتب اللي بعده في نفس المكان
                  loop: true,
                }}
              />
            </CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Login to track your lost item or report a find..
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="EX.@gmail.com"
                    className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-[#1d63ed]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#1d63ed] font-bold"
                  >
                    Forgot Password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-[#1d63ed]"
                  />
                  <span
                    onClick={togglePasswordVisability}
                    className="absolute right-3 top-3 h-5 w-5 text-slate-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="rounded-md border-slate-300"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium text-slate-600 cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>

              <Button className="w-full h-14 bg-[#1d63ed] hover:bg-blue-700 text-white font-bold rounded-2xl text-lg shadow-lg shadow-blue-100">
                Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-bold">
                  OR SIGN IN WITH
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-slate-200 font-semibold hover:bg-slate-50"
                >
                  <Mail className="text-red-500" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-slate-200 font-semibold hover:bg-slate-50"
                >
                  <Facebook className="text-blue-500" />
                  Facebook
                </Button>
              </div>
            </form>
          </CardContent>

          <footer className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              Don't have an account?
              <Link to="/register">
                <Button variant="link" className="text-[#1d63ed] font-bold p-1">
                  Sign up for free
                </Button>
              </Link>
            </p>
          </footer>
        </div>
      </Card>
    </div>
  );
};

export default Login;
