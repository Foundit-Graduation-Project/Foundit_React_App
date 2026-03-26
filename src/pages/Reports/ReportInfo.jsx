
import { FileText } from "lucide-react";
import ReportWhenAndWhere from "./ReportWhenAndWhere";

export default function ReportInfo({ item }) {
  // Mapping the specs to match the visual hierarchy in the photo
  const specs = [
    { label: "BRAND", val: item.brand || "N/A" },
    { label: "COLOR", val: item.color || "N/A" },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Item Description Section */}
      <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">Item Description</h2>
        </div>

        {/* Specs Grid - Matches the Photo layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 mb-10">
          {specs.map((spec, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking">
                {spec.label}
              </p>
              <p className="text-lg font-bold text-[#1e293b] leading-tight">
                {spec.val}
              </p>
            </div>
          ))}
        </div>

        {/* Description Text - Font weights and colors matched to image */}
        <div className="space-y-6 text-[#475569] text-[15px] leading-relaxed">
          <p className="font-medium">
            {item.description || "I accidentally left my laptop in the 2nd floor study area of the Central Library yesterday afternoon around 4 PM. It was on one of the circular tables near the windows overlooking the quad."}
          </p>
        </div>
      </section>

      {/* When & Where Section */}
      {item.status === "MATCHED" && <ReportWhenAndWhere item={item} />}
    </div>
  );
}