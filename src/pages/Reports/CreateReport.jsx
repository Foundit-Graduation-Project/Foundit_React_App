import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import PostingGuidelines from "./PostGuideLine";
import { resetForm, createReport } from "../../features/reports/reportsSlice"; // IMPORT the Thunk
import { useDispatch, useSelector } from "react-redux"; // IMPORT hooks
import { useNavigate } from "react-router-dom"; // For redirecting after success
import Footer from "../../components/layout/customFooters/myReportsFooter"
import ReportHeader from "./ReportHeader";
import { toast } from "react-hot-toast"; // Recommended for feedback

import {
  Camera,
  MapPin,
  Calendar,
  ChevronLeft,
  Search,
  Home,
  User,
  PlusCircle,
  Loader2,
} from "lucide-react";
import FormInput from "./ReportInputs";

const CreateReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ACCESS Redux state to show loading spinner on button
  const { loading } = useSelector((state) => state.report);

  const [reportType, setReportType] = useState("lost");
  const [selectedImages, setSelectedImages] = useState([]); // State for file uploads

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    subCategory: "",
    date: "",
    location: "",
    description: "",
  });

  const subCategories = {
    electronics: ["Mobile", "Tablet", "Laptop", "Camera", "others"],
    documents: ["ID Card", "Passport", "Driving License", "others"],
    walletsKeys: ["Home Keys", "Car Keys", "Others"],
    pets: ["dogs", "cats", "reptile"],
  };

  const requiredFields = ["itemName", "category", "date", "location", "description"];

  // Logic to handle progress bar
  const filledFields = requiredFields.filter(
    (field) => formData[field] && formData[field].toString().trim() !== "",
  );
  const currentProgress = Math.round((filledFields.length / requiredFields.length) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE image selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  // INTEGRATION: Submit logic using Redux Thunk
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. استخدام FormData لأننا نرسل صوراً
//     const data = new FormData();

//     // --- مطابقة الحقول مع الـ Schema ---
//     data.append("title", formData.itemName);
//     data.append("description", formData.description);
//     data.append("type", reportType.toUpperCase()); // 'LOST' or 'FOUND'

//     // الـ Schema تطلب Enum محدد، يجب أن يبدأ بحرف كبير
//     // سنقوم بتحويل القيمة لتطابق الـ Enum في الـ Backend
//     const categoryMapping = {
//       electronics: "Electronics",
//       pets: "Pets",
//       walletsKeys: "Wallets", // لاحظي التحويل من walletsKeys إلى Wallets
//       documents: "Documents"
//     };
//     data.append("category", categoryMapping[formData.category] || "Other");

//     // الحقل في الـ Schema اسمه dateHappened وليس date
//     data.append("dateHappened", formData.date);

//     // الحقل في الـ Schema اسمه locationName للعنوان النصي
//     data.append("locationName", formData.location);

//     // إذا كان لديكِ إحداثيات خريطة (اختياري حالياً)
//     // data.append("location[type]", "Point");
//     // data.append("location[coordinates]", JSON.stringify([lng, lat]));

//     // 2. إضافة الصور (تأكدي أن الاسم 'images' يطابق الـ Backend)
//     selectedImages.forEach((image) => {
//       data.append("images", image);
//     });

//     try {
//       const resultAction = await dispatch(createReport(data));

//       if (createReport.fulfilled.match(resultAction)) {
//         toast.success("Report created successfully!");
//         dispatch(resetForm());
//         navigate("/my-reports");
//       } else {
//         console.error("Backend Error:", resultAction.payload);
//         toast.error(resultAction.payload?.message || "Check required fields");
//       }
//     } catch (err) {
//       console.error("Submission Error:", err);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  // --- Basic Fields ---
  data.append("title", formData.itemName);
  data.append("description", formData.description);
  data.append("type", reportType.toUpperCase());
  data.append("dateHappened", formData.date);
  data.append("locationName", formData.location);

  // --- Fix Category Enum ---
  const categoryMapping = {
    electronics: "Electronics",
    pets: "Pets",
    walletsKeys: "Wallets",
    documents: "Documents"
  };
  data.append("category", categoryMapping[formData.category] || "Other");

  // --- NEW: Handle GeoJSON Location ---
  // If you have actual coordinates from a map picker, use them. 
  // If not, we must provide a default or dummy array to satisfy the 2dsphere index.
  const longitude = formData.lng || 31.2357; // Default Cairo Long
  const latitude = formData.lat || 30.0444;  // Default Cairo Lat

  data.append("location[type]", "Point");
  data.append("location[coordinates][0]", longitude); // Longitude first
  data.append("location[coordinates][1]", latitude);  // Latitude second

  // --- Images ---
  selectedImages.forEach((image) => {
    data.append("images", image);
  });

  try {
    const resultAction = await dispatch(createReport(data));
    if (createReport.fulfilled.match(resultAction)) {
      toast.success("Report created!");
      navigate("/my-reports");
    } else {
      console.error("Backend Error:", resultAction.payload);
      toast.error(resultAction.payload?.message || "Location error");
    }
  } catch (err) {
    console.error(err);
  }
};
  return (
    <article className="w-full mx-auto bg-slate-50 min-h-screen flex flex-col transition-all">
      <ReportHeader />
      
      <main className="flex-1 p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-5 ">
        <div className="lg:col-span-9">
          <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl ">
            {/* Toggle between Lost and Found */}
            <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mb-8 max-w-xl mx-auto ">
              <button
                type="button"
                onClick={() => setReportType("lost")}
                className={`${reportType === "lost" ? "bg-white shadow-md text-blue-600 lg:bg-blue-600 lg:text-white" : "text-slate-500"} flex-1 py-4 text-sm font-bold rounded-xl transition-all`}
              >
                I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setReportType("found")}
                className={`${reportType === "found" ? "bg-white shadow-md text-blue-600 lg:bg-blue-600 lg:text-white" : "text-slate-500"} flex-1 py-4 text-sm font-bold rounded-xl transition-all`}
              >
                I Found Something
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Item Name"
                  name="itemName" // Ensure name attribute is set for handleInputChange
                  id="itemName"
                  placeholder="e.g. Samsung A23"
                  value={formData.itemName}
                  onChange={handleInputChange}
                />
                
                {/* Category Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="pets">Pets</option>
                    <option value="walletsKeys">Wallets/Keys</option>
                    <option value="documents">Documents</option>
                  </select>

                  {/* Dynamic Sub-Category based on Category selection */}
                  {formData.category && subCategories[formData.category] && (
                    <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                      <label className="text-sm font-semibold text-slate-700">Sub-Category</label>
                      <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select specific type</option>
                        {subCategories[formData.category].map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormInput
                  label="Date"
                  name="date"
                  id="date"
                  type="date"
                  icon={Calendar}
                  value={formData.date}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Location"
                  name="location"
                  id="location"
                  placeholder="EX: Cairo, Helwan"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Provide color, marks, or serial numbers..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-3">
                <div className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-3xl group hover:border-blue-400 cursor-pointer relative">
                  <Camera className="w-12 h-12 text-blue-500 mb-3" />
                  <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-bold">
                    {selectedImages.length > 0 ? `${selectedImages.length} images selected` : "Click to upload images"}
                  </label>
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    multiple 
                    onChange={handleFileChange} 
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="flex w-full lg:justify-between gap-4">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="hidden lg:block px-8 py-5 bg-white text-black font-bold text-lg rounded-2xl hover:text-red-500 transition-all"
                >
                  Cancel
                </button>
                
                {/* Submit button with Loading State */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 lg:flex-none lg:w-64 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Progress */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 sticky top-10 shadow-sm mb-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Report Completion</h3>
            <Progress value={currentProgress} className="w-full h-2 bg-slate-100" />
            <p className="text-[12px] font-bold text-blue-600 mt-2 text-center">{currentProgress}% Complete</p>
          </div>
          <PostingGuidelines />
        </aside>
      </main>
      <Footer />
    </article>
  );
};

export default CreateReport;