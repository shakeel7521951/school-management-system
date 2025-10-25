import { useTranslation } from "react-i18next";

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  const s = student.data;
  const { t } = useTranslation("adminRegistrationData");

  return (
    <div
      className="fixed inset-0 bg-[#104c80]/70 flex items-center justify-center z-50 px-3"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-scroll max-h-[90vh] 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <h3 className="text-2xl font-bold mb-6 text-[#104c80] border-b pb-3">
          {t("registrationData.studentModal.title")}
        </h3>

        {/* Modal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.registrationDate")}:</b>{" "}
            {s?.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB") : t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.childName")}:</b> {s?.child_name}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.age")}:</b> {s?.age}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.nationality")}:</b> {s?.nationality}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.dob")}:</b> {s?.dob || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.homePhone")}:</b> {s?.home_phone || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.motherMobile")}:</b> {s?.mother_mobile || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.fatherMobile")}:</b> {s?.father_mobile || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.personalId")}:</b> {s?.id_number}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.fatherName")}:</b> {s?.father_name}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.motherName")}:</b> {s?.mother_name}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.fatherOccupation")}:</b> {s?.father_job || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.motherOccupation")}:</b> {s?.mother_job || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.previousSchool")}:</b> {s?.previous_school || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.medicalCondition")}:</b> {s?.medical_condition || t("registrationData.studentModal.placeholders.none")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.medicalDetails")}:</b> {s?.medical_details || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.declarerName")}:</b> {s?.declarer_name}
          </div>
          <div>
            <b className="text-[#104c80]">{t("registrationData.studentModal.fields.signature")}:</b> {s?.signature || t("registrationData.studentModal.placeholders.notAvailable")}
          </div>
        </div>

        {/* Modal Action */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#104c80] hover:bg-blue-900 text-white px-6 py-2 rounded-md transition"
          >
            {t("registrationData.studentModal.buttons.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
