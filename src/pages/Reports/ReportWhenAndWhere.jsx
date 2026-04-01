import { Map, Calendar, MapPin } from "lucide-react";
import ReportMap from "./ReportMap"; 

export default function ReportWhenAndWhere({ item }) {
  const data = item || {};

  // Leaflet [lat, lng]
  const coordinates = data.location?.coordinates;
  const lat = coordinates ? coordinates[1] : 30.0444; 
  const lng = coordinates ? coordinates[0] : 31.2357;
  const position = [lat, lng];

  return (
    <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <Map className="text-blue-600 dark:text-blue-400" size={24} strokeWidth={2.5} />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">When & Where</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div className="flex gap-5 items-start">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <Calendar className="text-slate-600 dark:text-slate-400" size={22} />
            </div>
            <div className="pt-1">
              <p className="text-base font-bold text-slate-900 dark:text-white">Date & Time</p>
              <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                {data.dateHappened ? new Date(data.dateHappened).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <MapPin className="text-slate-600 dark:text-slate-400" size={22} />
            </div>
            <div className="pt-1">
              <p className="text-base font-bold text-slate-900 dark:text-white">Location</p>
              <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">{data.locationName || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full min-h-75">
          <div className="w-full h-full p-2.5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-full h-75 lg:h-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-50 dark:border-slate-700">
              
              <ReportMap position={position} isPicker={false} />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400]">
                 <div className="relative">
                   <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                   <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-xl relative z-10"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}