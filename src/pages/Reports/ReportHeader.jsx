import React from "react";
import { Button } from "@/components/ui/button";
import Nav from "../../components/layout/customNavbars/homeNav";
import { useLocation } from "react-router-dom";

function ReportHeader() {
  const location = useLocation();

  return (
    <div className="hidden lg:block">
      <div className="header z-[1001]">
        {/* <nav className="">
          <ul className="flex">
            <Button variant="defualt">
              <li className="text-slate-500 hover:text-slate-900">Home</li>
            </Button>
            <Button variant="defualt" size="icon">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right-icon lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </li>
            </Button>
            <Button variant="defualt" size="" aria-label="">
              <li className="text-slate-900">Reports</li>
            </Button>
          </ul>
        </nav> */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full h-18 px-6 flex items-center justify-between gap-8 shadow-sm">
          <Nav />
        </div>
        <div className="py-3 px-10">
          <div className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
            <h2>Create a New Report</h2>
          </div>
          <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
            Provide details to help our community to find your lost item
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReportHeader;
