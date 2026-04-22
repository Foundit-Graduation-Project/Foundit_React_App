import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAvatar } from "../../features/user/userSlice";
import toast from "react-hot-toast";

export default function SettingsPhoto() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Safely get the image URL from your DB model
  const photoPreview = user?.avatar?.url;
  const fileInputRef = useRef(null);

  // 1. LOCAL LOADING STATE (Isolates this button from the rest of the page)
  const [isUploading, setIsUploading] = useState(false);

  // Helper to generate initials dynamically
  const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 2. Client-side Validation: Check if file is > 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File is too large! Maximum size is 2MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setIsUploading(true);

      try {
        // 3. The "toast.promise" magic! 
        // It shows a loading spinner toast, then changes to green success or red error automatically.
        await toast.promise(
          dispatch(updateAvatar(file)).unwrap(),
          {
            loading: 'Uploading new photo...',
            success: 'Profile photo updated successfully!',
            error: 'Failed to update photo. Please try again.',
          }
        );
      } catch (err) {
        console.error("Failed to update avatar", err);
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
      <Avatar className="w-24 h-24 ring-2 ring-border shadow-sm">
        <AvatarImage src={photoPreview} alt="Profile Photo" className="object-cover" />
        <AvatarFallback className="text-2xl bg-blue-100 text-blue-600 font-bold">
          {getInitials(user?.name)}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-3 flex flex-col text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp" // Restricted to safe image types
            className="hidden"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
          >
            {isUploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload Photo</>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Recommended size: 500x500px. JPG, PNG, or WEBP up to 2MB.
        </p>
      </div>
    </div>
  );
}