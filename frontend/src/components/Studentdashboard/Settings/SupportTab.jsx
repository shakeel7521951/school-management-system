import React from "react";
import { HelpCircle } from "lucide-react";

const SupportTab = ({ darkMode }) => (
  <>
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <HelpCircle size={20} /> Help & Support
    </h2>
    <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
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
