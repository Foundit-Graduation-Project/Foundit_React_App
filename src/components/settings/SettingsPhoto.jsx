import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setProfilePhoto } from "../../features/settings/settingSlice";

export default function ProfilePhotoSection() {
  const dispatch = useDispatch();
  const photoPreview = useSelector((state) => state.settings.profilePhoto);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setProfilePhoto(reader.result));
      };
      reader.readAsDataURL(file); // Convert image to Base64 string
    }
  };

  const handleRemovePhoto = () => {
    dispatch(setProfilePhoto(""));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
      <Avatar className="w-24 h-24 ring-2 ring-border shadow-sm">
        <AvatarImage src={photoPreview || ""} alt="Profile Photo" className="object-cover" />
        <AvatarFallback className="text-2xl bg-gray-500 text-white">AT</AvatarFallback>
      </Avatar>
      
      <div className="space-y-3 flex flex-col text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
          <Button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Photo
          </Button>
          <Button type="button" onClick={handleRemovePhoto} variant="outline" className="text-red-500 border-border hover:bg-red-500/10 hover:text-red-400">
            Remove
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Recommended size: 500x500px. JPG, GIF, or PNG up to 2MB.
        </p>
      </div>
    </div>
  );
}