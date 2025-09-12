import React from "react";
import { HelpCircle } from "lucide-react";

const SupportTab = () => (
  <>
  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 ">
        <HelpCircle size={22} className="text-[#104C80]" /> Help & Support
      </h2>
    <p className="text-lg mb-4 text-gray-600 mt-4">
      If you need assistance, please contact our support team.
    </p>
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-[#104C80] text-white rounded-lg shadow hover:bg-[#0d3a63] transition-transform transform hover:scale-105">
        Contact Support
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
        View FAQs
      </button>
    </div>
  </>
);

export default SupportTab;
