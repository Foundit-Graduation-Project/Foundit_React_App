import React from "react";

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${Icon ? "pl-10" : "pl-4"}`}
      />
    </div>
  </div>
);

export default FormInput;
