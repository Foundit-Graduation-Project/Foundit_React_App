
export default function StepWork({ number, title, description, icon: Icon, showLine = true }) {
 return (
    <div className="flex-1 flex flex-col items-center md:items-start relative group">
      {showLine && (
        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-blue-100 z-0" />
      )}

      
      {/* Icon and Number Badge */}
      <div className="relative mb-4 md:mb-6 z-10 transition-transform group-hover:scale-110 duration-300">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold text-blue-600 shadow-sm">
          {number}
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center md:text-left pb-12 md:pb-0">
        <h3 className="text-base md:text-lg font-bold text-slate-700 mb-2 md:mb-3">{title}</h3>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-60 md:max-w-50">
          {description}
        </p>
      </div>
    </div>
  );
}