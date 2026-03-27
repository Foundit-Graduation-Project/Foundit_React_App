import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateMe } from "../../features/user/userSlice";

export default function SettingsProfile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: user?.name || "" }
  });

  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onProfileSubmit = async (data) => {
    try {
      const updatedUser = await dispatch(updateMe({ name: data.name })).unwrap();
      if (updatedUser?.name) {
        reset({ name: updatedUser.name });
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Profile Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information.</p>
      </div>
      
      <form onSubmit={handleSubmit(onProfileSubmit)} className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Personal Info</h3>
        
        <div className="space-y-3">
          <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} className="bg-background border-border" />
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}
