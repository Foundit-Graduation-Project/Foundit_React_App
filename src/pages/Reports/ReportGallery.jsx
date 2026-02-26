import { useState } from "react";

export default function ReportGallery({ images, title, id }) {
  
  const photoList = images || [];

  const [activePhoto, setActivePhoto] = useState(photoList[0]);

  // If there are no images yet, show a loading placeholder or return null
  if (photoList.length === 0) {
    return <div className="aspect-video bg-slate-100 rounded-xl animate-pulse" >not Photos upload</div>;
  }

  const currentIndex = photoList.indexOf(activePhoto) + 1;    
  
  return (
    <div className="bg-transparent">
      {/* Main Display Area */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-white mb-6 border border-slate-100 shadow-sm">
        <img 
          src={activePhoto || photoList[0]} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-500" 
        />
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
          {currentIndex > 0 ? currentIndex : 1} of {photoList.length} Photos
        </div>
      </div>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {photoList.map((photoUrl, index) => {
          const isSelected = activePhoto === photoUrl;

          return (
            <button 
              key={`${id}-${index}`} 
              onClick={() => setActivePhoto(photoUrl)}
              className={`
                relative aspect-square rounded-lg border-2 transition-all duration-300 overflow-hidden
                ${isSelected ? 'border-blue-600 shadow-md scale-105' : 'border-transparent'}
              `}
            >
              <img 
                src={photoUrl} 
                className={`
                  w-full h-full object-cover transition-all duration-300
                  ${isSelected ? 'opacity-100' : 'opacity-40 hover:opacity-60'}
                `} 
                alt={`Thumbnail ${index}`} 
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}