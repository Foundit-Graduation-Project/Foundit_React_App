import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // 👈 Added for loading spinner

// --- Integration Imports ---
import toast from "react-hot-toast";
import { changePasswordAPI } from "../../features/user/userAPI"; // Adjust path if needed

// --- Zod Schema (Synced with Backend Joi Schema) ---
const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string()
    .min(8, "Must be at least 8 characters.")
    .regex(/[a-zA-Z]/, "Must contain a letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmNewPassword: z.string().min(1, "Please confirm your new password.")
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match.",
  path: ["confirmNewPassword"],
});

export default function SettingsPassword() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onChange" // Better UX for instant feedback
  });

  const onPasswordSubmit = async (data) => {
    try {
      // 1. Call the backend API directly
      const response = await changePasswordAPI(data);

      // 2. Show success toast
      toast.success(response.message || "Password updated successfully!");

      // 3. Clear the form inputs
      reset();
    } catch (error) {
      // 4. Catch backend errors (e.g. "Incorrect current password")
      toast.error(error || "Failed to update password. Please try again.");
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Account & Security</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your credentials and keep your account protected.</p>
      </div>

      <form onSubmit={handleSubmit(onPasswordSubmit)} className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-6">Change Password</h3>

        {/* Current Password */}
        <div className="space-y-3">
          <Label htmlFor="currentPassword" className="text-muted-foreground">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            {...register("currentPassword")}
            className={`bg-background border-border h-11 focus-visible:ring-blue-600 ${errors.currentPassword ? 'border-red-500' : ''}`}
          />
          {errors.currentPassword && <p className="text-xs text-red-500 font-medium">{errors.currentPassword.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Password */}
          <div className="space-y-3">
            <Label htmlFor="newPassword" className="text-muted-foreground">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Minimum 8 characters"
              {...register("newPassword")}
              className={`bg-background border-border h-11 focus-visible:ring-blue-600 ${errors.newPassword ? 'border-red-500' : ''}`}
            />
            {errors.newPassword && <p className="text-xs text-red-500 font-medium">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-3">
            <Label htmlFor="confirmNewPassword" className="text-muted-foreground">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              placeholder="Repeat new password"
              {...register("confirmNewPassword")}
              className={`bg-background border-border h-11 focus-visible:ring-blue-600 ${errors.confirmNewPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmNewPassword && <p className="text-xs text-red-500 font-medium">{errors.confirmNewPassword.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white hover:bg-blue-700 h-11 px-6 font-semibold transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
              </span>
            ) : "Update Password"}
          </Button>
        </div>
      </form>
    </section>
  );
}