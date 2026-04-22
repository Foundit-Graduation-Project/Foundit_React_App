import React, { useState } from "react";
import { ArrowLeft, Mail, Loader2, ShieldCheck } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

// Components
import RegisterNav from "../../components/layout/customNavbars/registerNav";
import ResetPasswordFooter from "../../components/layout/customFooters/resetPasswordFooter";

// API
import { forgotPasswordAPI } from "../../features/auth";

// Validation
const forgotSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotSchema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await forgotPasswordAPI(data.email);
            toast.success(response.message || "Reset link sent!");
            setIsSent(true);
        } catch (error) {
            toast.error(error || "Failed to send reset link.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between">
            <RegisterNav />

            <Card className="w-full max-w-[28rem] my-auto shadow-xl border-none">
                {isSent ? (
                    // --- SUCCESS STATE ---
                    <CardContent className="pt-10 pb-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Check Your Inbox</h2>
                        <p className="text-slate-500 text-sm">
                            We've sent a magic link to your email. Click it to reset your password securely.
                        </p>
                    </CardContent>
                ) : (
                    // --- FORM STATE ---
                    <>
                        <CardHeader className="text-center space-y-2 pt-8">
                            <CardTitle className="text-2xl font-bold text-slate-900">
                                Forgot Password?
                            </CardTitle>
                            <CardDescription className="text-slate-500">
                                Enter your email address and we'll send you a link to reset your password.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            {...register("email")}
                                            className={`pl-10 h-12 rounded-xl focus-visible:ring-[#1d63ed] ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70 shadow-md shadow-blue-200"
                                >
                                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send Reset Link"}
                                </Button>
                            </form>
                        </CardContent>
                    </>
                )}

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