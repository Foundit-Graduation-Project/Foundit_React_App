export default function PasswordStrengthBar({ password = "" }) {
  const calculateStrength = (pwd) => {
    console.log(pwd);
    
    if (!pwd) return 0
    let score = 0

    if (pwd.length >= 6) score += 1 
    if (pwd.length >= 10) score += 1 
    if (/[A-Z]/.test(pwd)) score += 1 
    if (/[0-9!@#$%^&*]/.test(pwd)) score += 1 

    return score 
  }

  const score = calculateStrength(password)

  const bars = [
    { label: "Weak", active: score >= 1, color: "bg-blue-300" },
    { label: "Medium", active: score >= 2, color: "bg-blue-400" },
    { label: "Strong", active: score >= 3, color: "bg-blue-500" },
  ]

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded ${
              bar.active ? bar.color : "bg-gray-300"
            } transition-all duration-300`}
          ></div>
        ))}
      </div>

      {/* Text label */}
      <p className="text-xs text-muted-foreground text-left">
        {score <= 1 && "Weak"}
        {score === 2 && "Medium"}
        {score >= 3 && "Strong"}
      </p>
    </div>
  )
}