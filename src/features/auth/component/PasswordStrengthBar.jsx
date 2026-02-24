// export default function PasswordStrengthBar({ password = "" }) {
//   const calculateStrength = (pwd) => {
//     console.log(pwd);
    
//     if (!pwd) return 0
//     let score = 0

//     if (pwd.length >= 6) score += 1 
//     if (pwd.length >= 10) score += 1 
//     if (/[A-Z]/.test(pwd)) score += 1 
//     if (/[0-9!@#$%^&*]/.test(pwd)) score += 1 

//     return score 
//   }

//   const score = calculateStrength(password)

//   const bars = [
//     { label: "Weak", active: score >= 1, color: "bg-blue-300" },
//     { label: "Medium", active: score >= 2, color: "bg-blue-400" },
//     { label: "Strong", active: score >= 3, color: "bg-blue-500" },
//   ]

//   return (
//     <div className="space-y-1">
//       <div className="flex gap-1">
//         {bars.map((bar, index) => (
//           <div
//             key={index}
//             className={`flex-1 h-2 rounded ${
//               bar.active ? bar.color : "bg-gray-300"
//             } transition-all duration-300`}
//           ></div>
//         ))}
//       </div>

//       {/* Text label */}
//       <p className="text-xs text-muted-foreground text-left">
//         {score <= 1 && "Weak"}
//         {score === 2 && "Medium"}
//         {score >= 3 && "Strong"}
//       </p>
//     </div>
//   )
// }




export default function PasswordStrengthBar({ password = "", mode = "segments" }) {
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;

    if (pwd.length >= 6) score += 1; 
    
    if (/[A-Z]/.test(pwd)) score += 1; 
    
    if (/[0-9!@#$%^&*]/.test(pwd)) score += 1; 

    return score; 
  };

  const score = calculateStrength(password);

  const getDynamicStyle = (s) => {
    if (s === 0) return { width: "0%", label: "None", color: "bg-gray-200", text: "text-gray-400" };
    if (s === 1) return { width: "33%", label: "Weak", color: "bg-red-500", text: "text-red-500", segText: "text-blue-300" };
    if (s === 2) return { width: "66%", label: "Medium", color: "bg-yellow-500", text: "text-yellow-500", segText: "text-blue-400" };
    return { width: "100%", label: "Strong", color: "bg-blue-600", text: "text-blue-600", segText: "text-blue-600" };
  };

  const dynamic = getDynamicStyle(score);

  // --- STYLE 1: REGISTER (3 Blue Segments)
  if (mode === "segments") {
    return (
      <div className="mt-2">
        <p className="flex justify-between items-center text-[10px] font-bold uppercase mb-2">
          <span className="text-gray-500">
            Password Strength: <span className={dynamic.segText}>{dynamic.label}</span>
          </span>
          <span className="text-gray-400">{dynamic.width}</span>
        </p>

        <div className="flex gap-1">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`flex-1 h-1.5 rounded transition-all duration-500 ${
                score >= index 
                  ? (index === 1 ? "bg-blue-200" : index === 2 ? "bg-blue-400" : "bg-blue-600") 
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // --- STYLE 2: RESET PASSWORD (1 Dynamic Color Bar) ---
  return (
    <div className="mt-4">
      <p className="flex justify-between items-center text-[10px] font-bold uppercase mb-2">
        <span className="text-gray-500">
          Password Strength: <span className={dynamic.text}>{dynamic.label}</span>
        </span>
        <span className="text-gray-400">{dynamic.width}</span>
      </p>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${dynamic.color} transition-all duration-700 ease-out`}
          style={{ width: dynamic.width }}
        />
      </div>
    </div>
  );
}