import React from "react";
import { Info, CheckCircle2 } from "lucide-react";

const PostingGuidelines = () => {
  const guidelines = [
    "Be as specific as possible in description.",
    "Don't include personal contact info in the public description.",
    "Use high-quality photos in good lighting.",
  ];

  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <Info className="w-5 h-5" />
        <h3 className="font-bold text-lg">Posting Guidelines</h3>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {guidelines.map((text, index) => (
          <li key={index} className="flex gap-3 items-start group">
            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
            <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostingGuidelines;
