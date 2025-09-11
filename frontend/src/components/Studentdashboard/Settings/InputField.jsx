import React from "react";

const InputField = ({ label, type = "text", value, setValue }) => (
  <div className="group">
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#104C80] outline-none transition-all duration-300 group-hover:border-[#104C80]"
    />
  </div>
);

export default InputField;
