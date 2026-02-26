import { Map, Calendar, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not showing in React projects
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function ReportWhenAndWhere({ item }) {

const data = item || {};
const lat = data.lat || 51.505; 
  const lng = data.lng || -0.09;
  const position = [lat, lng];
  return (
    <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <Map className="text-blue-600" size={24} strokeWidth={2.5} />
        <h2 className="text-2xl font-bold text-slate-900">When & Where</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side: Text Details */}
        <div className="flex-1 space-y-8">
          <div className="flex gap-5 items-start">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
              <Calendar className="text-slate-600" size={22} />
            </div>
            <div className="pt-1">
              <p className="text-base font-bold text-slate-900">Date & Time</p>
              <p className="text-[15px] text-slate-500 mt-1.5 font-medium">
                {item.date || "N/A"}
              </p>
              <p className="text-[15px] text-slate-500 font-medium">Approx. 4:15 PM</p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <MapPin className="text-slate-600" size={22} />
            </div>
            <div className="pt-1">
              <p className="text-base font-bold text-slate-900">Location</p>
              <p className="text-[15px] text-slate-500 mt-1.5 font-medium">
                {item.location || "Central Library, Floor 2"}
              </p>
              <p className="text-[14px] text-slate-400 italic font-medium mt-1">
                Area: Silent Study Wing
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Framed Map Container */}
        <div className="flex-1">
          <div className="w-full h-full min-h-50 p-2.5 bg-white rounded-[2rem] border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
            <div className="w-full h-full rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-50">
              
              <MapContainer 
                center={position} 
                zoom={14} 
                scrollWheelZoom={false}
                className="w-full h-full z-0 filter grayscale-[0.2] contrast-[0.9]"
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
              </MapContainer>

              {/* Your custom pulse overlay (optional if using Marker) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-400">
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