import React from "react";

export function ProgressDemo() {
  const [progress, setProgress] = useState(30);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
}
