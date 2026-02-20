import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import PostingGuidelines from "./PostGuideLine";
import { resetForm } from "../../features/reports/reportsSlice";
import { useDispatch } from "react-redux";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";

import {
  Camera,
  MapPin,
  Calendar,
  ChevronLeft,
  Search,
  Home,
  User,
  PlusCircle,
} from "lucide-react";
import FormInput from "./ReportInputs";

const CreateReport = () => {
  const dispatch = useDispatch();
  const handleCancle = () => {
    dispatch(resetForm());
  };

  const [reportType, setReportType] = useState("lost");

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    date: "",
    location: "",
    description: "",
  });
  // if we need to add sub Categories from here!!! then go to select category to add value
  const subCategories = {
    electronics: ["Mobile", "Tablet", "Laptop", "Camera", "others"],
    documents: ["ID Card", "Passport", "Driving License", "others"],
    walletsKeys: ["Home Keys", "Car Keys", "Others"],
    pets: ["dogs", "cats", "reptile"],
  };

  const requiredFields = [
    "itemName",
    "category",
    "date",
    "location",
    "description",
  ];
  //-logic to handle progress par with form "dont touch it"-
  const filledFields = requiredFields.filter(
    (field) => formData[field] && formData[field].toString().trim() !== "",
  );
  const currentProgress = Math.round(
    (filledFields.length / requiredFields.length) * 100,
  );

  // funcation to detect map was here

  //-------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", { ...formData, type: reportType });
    alert("Report Submitted Successfully!");
  };

  return (
    <article className="w-full mx-auto bg-slate-50 min-h-screen flex flex-col transition-all">
      {/* header for desktop */}
      <ReportHeader />
      {/*  header الموبايل */}
      <header className="w-full px-4 py-5 flex items-center bg-white sticky top-0 z-10 border-b border-slate-200 lg:hidden ">
        <button className="flex p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900 pr-10">
          Report an Item
        </h1>
      </header>
      <main className="flex-1 p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-5 ">
        {/*  75% */}
        <div className="lg:col-span-9">
          <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl ">
            <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mb-8 max-w-xl mx-auto ">
              <button
                onClick={() => setReportType("lost")}
                className={`${reportType === "lost" ? "bg-white shadow-md text-blue-600 lg:bg-blue-600 lg:text-white" : "text-slate-500"} flex-1 py-4 text-sm font-bold rounded-xl transition-all`}
              >
                I Lost Something
              </button>
              <button
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
                  id="itemName"
                  placeholder="e.g. Samsung A23"
                  value={formData.itemName}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="pets">Pets</option>
                    <option value="walletsKeys">Wallets/Keys</option>
                    <option value="documents">Documents</option>
                  </select>
                  {formData.category && subCategories[formData.category] && (
                    <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                      <label className="text-sm font-semibold text-slate-700">
                        Sub-Category
                      </label>
                      <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select specific type</option>
                        {subCategories[formData.category].map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormInput
                  label="Date"
                  id="date"
                  type="date"
                  icon={Calendar}
                  value={formData.date}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Location"
                  id="location"
                  placeholder="Where was it ? EX: Cairo, helwan, <area name>/street name"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <div className="hidden lg:block">
                  <span className="text-sm text-slate-500 m-0 p-0">
                    map help you detect the location address
                  </span>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.1123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v123456789"
                    width="100%"
                    height="450"
                    className="border-slate-500 border-3 rounded-2xl"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Provide color or unique marks, serial numbers, or any details that help identify the item..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* upload imahes */}
              <div className="space-y-3">
                <div className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-3xl group hover:border-blue-400 cursor-pointer">
                  <Camera className="w-12 h-12 text-blue-500 mb-3" />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 font-bold"
                  >
                    Click to upload
                  </label>
                  <input type="file" id="file-upload" className="hidden" />
                </div>
              </div>

              <div className="flex w-full lg:justify-between">
                <button
                  onClick={() => dispatch(resetForm())}
                  type="button"
                  className="hidden lg:block  py-5 bg-white text-black font-bold text-lg rounded-2xl  hover:text-red-500 active:scale-[0.98] transition-all"
                >
                  Cancel or save draft
                </button>
                <button
                  type="submit"
                  className="w-full lg:w-50  py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98] transition-all mb-10"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>

        {/*   (25%) */}

        <aside className="lg:col-span-3 hidden lg:block">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 sticky top-10 shadow-sm mb-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">
              Report Completion
            </h3>

            <Progress
              value={currentProgress}
              className="w-full h-2 bg-slate-100 transition-all duration-500"
            />

            <p className="text-[12px] font-bold text-blue-600 mt-2 text-center">
              {currentProgress}% Complete
            </p>

            <p className="text-[10px] text-slate-400 mt-1 text-center">
              {requiredFields.length - filledFields.length}
            </p>
          </div>
          <PostingGuidelines />
        </aside>
      </main>
      {/* mobile nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 px-6 py-4 flex justify-between lg:hidden">
        <NavItem icon={Home} label="HOME" />
        <NavItem icon={PlusCircle} label="REPORT" active />
        <NavItem icon={Search} label="SEARCH" />
        <NavItem icon={User} label="PROFILE" />
      </nav>
      <ReportFooter />
    </article>
  );
};

const NavItem = ({ icon: Icon, label, active = false }) => (
  <div
    className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-blue-600" : "text-slate-400"}`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-[10px] font-extrabold">{label}</span>
  </div>
);

export default CreateReport;
