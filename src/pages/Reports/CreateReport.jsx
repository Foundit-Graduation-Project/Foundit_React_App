import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReport, resetForm } from "../../features/reports/reportsSlice";
import ReportHeader from "./ReportHeader";
import ReportMap from "./ReportMap";
import PostingGuidelines from "./PostGuideLine";
import Footer from "../../components/layout/customFooters/myReportsFooter";
import {
  Camera,
  MapPin,
  Calendar,
  ChevronLeft,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";
import FormInput from "./ReportInputs";

const CreateReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.report);

  const [reportType, setReportType] = useState("lost");
  const [images, setImages] = useState([]);

  const CAIRO_DEFAULT = [30.0444, 31.2357];

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    subCategory: "",
    date: "",
    location: "",
    description: "",
    coordinates: CAIRO_DEFAULT,
  });

  const subCategories = {
    Electronics: ["Mobile", "Tablet", "Laptop", "Camera", "others"],
    Documents: ["ID Card", "Passport", "Driving License", "others"],
    Wallets: ["Home Keys", "Car Keys", "Others"],
    Pets: ["dogs", "cats", "reptile"],
  };

  // --- حساب نسبة الإنجاز (Progress) ---
  const requiredFields = [
    "itemName",
    "category",
    "date",
    "location",
    "description",
  ];
  const filledFieldsCount = requiredFields.filter(
    (field) => formData[field] && formData[field].toString().trim() !== "",
  ).length;
  const imageBonus = images.length > 0 ? 1 : 0;
  const currentProgress = Math.round(
    ((filledFieldsCount + imageBonus) / (requiredFields.length + 1)) * 100,
  );
  const totalSteps = requiredFields.length + 1;

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      e.target.value = null;
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const data = new FormData();

    data.append("title", formData.itemName);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("type", reportType.toUpperCase());
    data.append("dateHappened", formData.date);
    data.append("locationName", formData.location);

    const geoData = {
      type: "Point",
      coordinates: [
        Number(formData.coordinates[1]),
        Number(formData.coordinates[0]),
      ], // [lng, lat]
    };
    data.append("location", JSON.stringify(geoData));

    images.forEach((img) => {
      data.append("images", img.file);
    });

    try {
      const resultAction = await dispatch(createReport(data));
      if (createReport.fulfilled.match(resultAction)) {
        alert("Report Created Successfully!");
        dispatch(resetForm());
        setImages([]);
        navigate("/my-reports");
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  return (
    <article className="w-full mx-auto bg-slate-50 min-h-screen flex flex-col">
      <ReportHeader />

      {/* Mobile Header */}
      <header className="w-full px-4 py-5 flex items-center bg-white sticky top-0 z-10 border-b border-slate-200 lg:hidden transition-all">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900 pr-10">
          Report an Item
        </h1>
      </header>

      <main className="flex-1 p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-9">
          <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl">
            {/* Type Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mb-8 max-w-xl mx-auto transition-all">
              <button
                type="button"
                onClick={() => setReportType("lost")}
                className={`${reportType === "lost" ? "bg-blue-600 text-white shadow-md" : "text-slate-500"} flex-1 py-4 text-sm font-bold rounded-xl transition-all`}
              >
                I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setReportType("found")}
                className={`${reportType === "found" ? "bg-blue-600 text-white shadow-md" : "text-slate-500"} flex-1 py-4 text-sm font-bold rounded-xl transition-all`}
              >
                I Found Something
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Item Name"
                  id="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="e.g. Samsung A23"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Documents">Documents</option>
                    <option value="Pets">Pets</option>
                    <option value="Wallets">Wallets/Keys</option>
                  </select>
                </div>
              </div>

              {formData.category && subCategories[formData.category] && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Specific Type
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="">Select type</option>
                    {subCategories[formData.category].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <FormInput
                  label="Date"
                  type="date"
                  id="date"
                  icon={Calendar}
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  label="General Location"
                  id="location"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Cairo, Nasr City"
                  required
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">
                      Pin Exact Location
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          coordinates: CAIRO_DEFAULT,
                        }))
                      }
                      className="flex items-center gap-1 text-[11px] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <RefreshCw size={12} /> Reset Map
                    </button>
                  </div>
                  <div className="h-[400px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner">
                    <ReportMap
                      position={formData.coordinates}
                      setPosition={(coords) =>
                        setFormData((p) => ({ ...p, coordinates: coords }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                  placeholder="Provide color, unique marks, or serial numbers..."
                  required
                />
              </div>

       

              {/* Action Buttons */}
              <div className="flex flex-col lg:flex-row w-full lg:justify-between gap-4 pt-6">
                <button
                  type="button"
                  className="w-full lg:w-64 py-5 text-slate-500 font-bold text-lg rounded-2xl mb-10 hover:bg-red-100 hover:text-red-600 transition-all"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full lg:w-72 py-5 text-white font-bold text-lg rounded-2xl shadow-lg transition-all mb-10 flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading && <Loader2 className="animate-spin w-5 h-5" />}
                  {loading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside className="lg:col-span-3 hidden lg:block">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 sticky top-10 shadow-sm mb-5 transition-all">
            <h3 className="text-sm font-bold text-slate-700 mb-4 tracking-tight">
              Report Completion
            </h3>
            <Progress
              value={currentProgress}
              className="h-2 bg-slate-100 [&>div]:bg-blue-600"
            />
            <p className="text-[13px] font-bold text-blue-600 mt-3 text-center">
              {currentProgress}% Done
            </p>
            <p className="text-[10px] text-slate-400 mt-1 text-center">
              Complete {totalSteps - (filledFieldsCount + imageBonus)} more
              steps to post
            </p>
          </div>

          <PostingGuidelines />
        </aside>
      </main>

      <Footer />
    </article>
  );
};

export default CreateReport;
