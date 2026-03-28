import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // For the spinning icon
import toast from "react-hot-toast"; // For the popups
import { updateMe } from "../../features/user/userSlice";

// --- 1. Zod Validation Schema (Matches Backend) ---
const profileSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name cannot exceed 50 characters.")
});

export default function SettingsProfile() {
  const dispatch = useDispatch();

  // Grab the global loading state and user data from Redux
  const { user, loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: { name: user?.name || "" }
  });

  // Sync form if Redux user state updates
  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onProfileSubmit = async (data) => {
    // --- 2. Smart Check: Don't hit the API if the name is exactly the same ---
    if (data.name === user?.name) {
      toast("No changes were made.", { icon: "ℹ️" });
      return;
    }

    try {
      // --- 3. Dispatch and Unwrap ---
      const updatedUser = await dispatch(updateMe({ name: data.name })).unwrap();

      // Show Success Toast!
      toast.success("Profile updated successfully!");

      // Reset form with new data
      if (updatedUser?.name) {
        reset({ name: updatedUser.name });
      }
    } catch (err) {
      // Show Error Toast!
      toast.error(err || "Failed to update profile. Please try again.");
      console.error("Failed to update profile", err);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Profile Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information.</p>
      </div>

      <form onSubmit={handleSubmit(onProfileSubmit)} className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-6">Personal Info</h3>

        <div className="space-y-3">
          <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={`bg-background border-border h-11 focus-visible:ring-blue-600 ${errors.name ? 'border-red-500' : ''}`}
          />
          {/* Validation Error Message */}
          {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name.message}</p>}
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white hover:bg-blue-700 h-11 px-6 font-semibold transition-all disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </span>
            ) : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}