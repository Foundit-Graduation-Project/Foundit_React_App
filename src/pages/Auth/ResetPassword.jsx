import {
  ArrowLeft,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import RegisterNav from "../../components/layout/customNavbars/registerNav";
import { Link } from "react-router-dom";
import ResetForm from './../../components/forms/resetForm';

export default function ResetPassword() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <RegisterNav />

      <Card className="w-full max-w-110 mt-20 shadow-xl border-none">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Set new password
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter your email and a new secure password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetForm />
        </CardContent>

        <CardFooter className="flex justify-center pb-8 border-t border-slate-50 pt-6">
          <Link
            to="/login"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700  px-6 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </CardFooter>
      </Card>

      <footer className="mt-8 text-center space-y-2 pb-10">
        <p className="text-xs text-slate-400">
          © 2026 Acme Corp. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-slate-400 justify-center">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
