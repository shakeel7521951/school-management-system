import React from "react";
import InputField from "./InputField";
import SaveButton from "./SaveButton";
import { Lock } from "lucide-react";

const SecurityTab = () => (
  <>
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Lock size={20} /> Security Settings
    </h2>
    <div className="space-y-4">
      <InputField label="Current Password" type="password" />
      <InputField label="New Password" type="password" />
      <SaveButton text="Update Password" />
    </div>
  </>
);

export default SecurityTab;
