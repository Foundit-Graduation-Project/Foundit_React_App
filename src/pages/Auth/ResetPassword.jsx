import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// Components
import RegisterNav from "../../components/layout/customNavbars/registerNav";
import ResetForm from './../../components/forms/resetForm';
import ResetPasswordFooter from './../../components/layout/customFooters/resetPasswordFooter';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between">
      <RegisterNav />

      {/* Changed max-w-110 to standard Tailwind class max-w-[28rem] for consistency */}
      <Card className="w-full max-w-[28rem] my-auto shadow-xl border-none">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Set new password
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter a new secure password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Form logic handled here */}
          <ResetForm />
        </CardContent>

        <CardFooter className="flex justify-center pb-8 border-t border-slate-50 pt-6">
          <Link
            to="/login"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-6 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </CardFooter>
      </Card>

      <ResetPasswordFooter />
    </div>
  );
}