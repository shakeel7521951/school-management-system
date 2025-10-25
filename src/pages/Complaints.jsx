import React from "react";
import ComplaintForm from "../components/complaints/ComplaintForm";
import HeroComplaints from "../components/complaints/HeroComplaints";

function Complaints() {
  return (
    <div>
        <HeroComplaints/>
      <ComplaintForm />
    </div>
  );
}

export default Complaints;
