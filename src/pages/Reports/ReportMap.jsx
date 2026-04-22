import React, { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapController = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const timer = setTimeout(() => {
      try {
        map.invalidateSize(true);
        if (center && map) {
          map.setView(center, map.getZoom(), { animate: true });
        }
      } catch (err) {
        console.warn("Leaflet map update failed:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [map, center]);

  return null;
};

const LocationPicker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
    },
  });
  return null;
};

const ReportMap = ({ position, setPosition, isPicker = true }) => {
  const center = useMemo(() => {
    return position && position[0] && position[1]
      ? [position[0], position[1]]
      : [30.0444, 31.2357];
  }, [position]);

  return (
    <div className="w-full h-full min-h-[300px] z-10 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm">
      <MapContainer
        center={center}
        zoom={10}
        maxZoom={30}
        // minZoom={5}
        attributionControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={30}
          maxNativeZoom={30}
          minZoom={1}

        />

        {isPicker && <LocationPicker setPosition={setPosition} />}

        {/* Control in size and ceterize*/}
        <MapController center={center} />

        {/* Marker */}
        <Marker position={center} icon={defaultIcon} />
      </MapContainer>

    </div>
  );
};

export default ReportMap;