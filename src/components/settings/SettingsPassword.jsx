import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "Must be at least 8 characters." }),
  confirmPassword: z.string().min(1, { message: "Please confirm your new password." })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function SettingsPassword() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = async (data) => {
    console.log("Hitting Backend: POST /api/auth/change-password", data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    alert("Password updated successfully!");
    reset(); // Clears the inputs after success
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Account & Security</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your credentials and keep your account protected.</p>
      </div>
      
      <form onSubmit={handleSubmit(onPasswordSubmit)} className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Change Password</h3>
        
        <div className="space-y-3">
          <Label htmlFor="currentPassword" className="text-muted-foreground">Current Password</Label>
          <Input id="currentPassword" type="password" placeholder="••••••••" {...register("currentPassword")} className={`bg-background border-border ${errors.currentPassword ? 'border-red-500' : ''}`} />
          {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="newPassword" className="text-muted-foreground">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Minimum 8 characters" {...register("newPassword")} className={`bg-background border-border ${errors.newPassword ? 'border-red-500' : ''}`} />
            {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-muted-foreground">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Repeat new password" {...register("confirmPassword")} className={`bg-background border-border ${errors.confirmPassword ? 'border-red-500' : ''}`} />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700">
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </section>
  );
}

