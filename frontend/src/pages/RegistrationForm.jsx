import React from "react";

const RegistrationForm = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#1c60a3] mb-8">
                    Student Registration Form | استمارة تسجيل طالب
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Column */}
                    <div>
                        {[
                            { label: "Registration Date", type: "date", name: "registration_date" },
                            { label: "Child’s Name", type: "text", name: "child_name_en" },
                            { label: "Age", type: "number", name: "age" },
                            { label: "Nationality", type: "text", name: "nationality" },
                            { label: "Date of Birth", type: "date", name: "dob" },
                            { label: "Home Phone", type: "tel", name: "home_phone" },
                            { label: "Mother’s Mobile", type: "tel", name: "mother_mobile" },
                            { label: "Father’s Mobile", type: "tel", name: "father_mobile" },
                            { label: "Personal ID Number", type: "text", name: "id_number" },
                            { label: "Father’s Name", type: "text", name: "father_name" },
                            { label: "Mother’s Name", type: "text", name: "mother_name" },
                            { label: "Father’s Occupation", type: "text", name: "father_job" },
                            { label: "Mother’s Occupation", type: "text", name: "mother_job" },
                            { label: "Previous School", type: "text", name: "previous_school" },
                        ].map((field, index) => (
                            <div key={index} className={index !== 0 ? "mt-3" : ""}>
                                <label className="block font-semibold mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Arabic Column */}
                    <div className="text-right">
                        {[
                            { label: "تاريخ التسجيل", type: "date", name: "registration_date_ar" },
                            { label: "اسم الطفل", type: "text", name: "child_name_ar" },
                            { label: "العمر", type: "number", name: "age_ar" },
                            { label: "الجنسية", type: "text", name: "nationality_ar" },
                            { label: "تاريخ الميلاد", type: "date", name: "dob_ar" },
                            { label: "هاتف المنزل", type: "tel", name: "home_phone_ar" },
                            { label: "جوال الأم", type: "tel", name: "mother_mobile_ar" },
                            { label: "جوال الأب", type: "tel", name: "father_mobile_ar" },
                            { label: "الرقم الشخصي", type: "text", name: "id_number_ar" },
                            { label: "اسم الأب", type: "text", name: "father_name_ar" },
                            { label: "اسم الأم", type: "text", name: "mother_name_ar" },
                            { label: "عمل الأب", type: "text", name: "father_job_ar" },
                            { label: "عمل الأم", type: "text", name: "mother_job_ar" },
                            { label: "المدرسة السابقة", type: "text", name: "previous_school_ar" },
                        ].map((field, index) => (
                            <div key={index} className={index !== 0 ? "mt-3" : ""}>
                                <label className="block font-semibold mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Medical Section */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block font-semibold mb-1">
                            Does your child suffer from any medical condition? | هل يعاني طفلك من أي حالة مرضية؟
                        </label>
                        <select
                            name="medical_condition"
                            className="w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="no">No | لا</option>
                            <option value="yes">Yes | نعم</option>
                        </select>
                        <textarea
                            name="medical_details"
                            className="w-full border border-gray-300 p-2 rounded-md mt-2"
                            placeholder="If yes, please explain and attach reports | إذا كانت الإجابة نعم يرجى البيان وإرفاق التقرير الطبي"
                        ></textarea>
                    </div>

                    {/* Declaration */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block font-semibold mb-1">
                            I hereby confirm the above information is correct | أقر بصحة البيانات السابقة
                        </label>
                        <input
                            type="text"
                            name="declarer_name"
                            placeholder="Full Name | الاسم"
                            className="w-full border border-gray-300 p-2 rounded-md mt-2"
                        />
                        <input
                            type="text"
                            name="signature"
                            placeholder="Signature | التوقيع"
                            className="w-full border border-gray-300 p-2 rounded-md mt-2"
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-[#1b4c80] hover:bg-[#386ca3] text-[#d1911b] font-bold px-6 py-3 rounded-md w-full sm:w-auto"
                        >
                            Submit | إرسال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
