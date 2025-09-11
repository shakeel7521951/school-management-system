import React from "react";

const SaveButton = ({ text }) => (
  <button className="px-4 py-2 bg-[#104C80] text-white rounded-lg shadow hover:bg-[#0d3a63] transition-transform transform hover:scale-105">
    {text}
  </button>
);

export default SaveButton;
