import React from "react";
import InputField from "./InputField";
import SaveButton from "./SaveButton";
import { User } from "lucide-react";

const ProfileTab = ({ fullName, setFullName, email, setEmail }) => {
  const handleSave = () => {
    // Example: save the data (API call or console log)
    console.log("Saved:", { fullName, email });

    // Reset input fields after saving
    setFullName("");
    setEmail("");
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <User size={20} /> Profile Settings
      </h2>
      <div className="space-y-4">
        <InputField label="Full Name" value={fullName} setValue={setFullName} />
        <InputField label="Email" value={email} setValue={setEmail} type="email" />
        <SaveButton text="Save Changes" onClick={handleSave} />
      </div>
    </>
  );
};

export default ProfileTab;
