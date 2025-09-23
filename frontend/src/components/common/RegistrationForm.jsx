import React from "react";

const RegistrationForm = () => {
    return (
        <div className="max-w-5xl mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
                Student Registration Form | استمارة تسجيل طالب
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Column */}
                <div>
                    <label className="block font-semibold mb-1">Registration Date</label>
                    <input type="date" name="registration_date" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Child’s Name</label>
                    <input type="text" name="child_name_en" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Age</label>
                    <input type="number" name="age" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Nationality</label>
                    <input type="text" name="nationality" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Date of Birth</label>
                    <input type="date" name="dob" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Home Phone</label>
                    <input type="tel" name="home_phone" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Mother’s Mobile</label>
                    <input type="tel" name="mother_mobile" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Father’s Mobile</label>
                    <input type="tel" name="father_mobile" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Personal ID Number</label>
                    <input type="text" name="id_number" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Father’s Name</label>
                    <input type="text" name="father_name" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Mother’s Name</label>
                    <input type="text" name="mother_name" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Father’s Occupation</label>
                    <input type="text" name="father_job" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Mother’s Occupation</label>
                    <input type="text" name="mother_job" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">Previous School</label>
                    <input type="text" name="previous_school" className="w-full border border-gray-300 p-2 rounded-md" />
                </div>

                {/* Arabic Column */}
                <div className="text-right">
                    <label className="block font-semibold mb-1">تاريخ التسجيل</label>
                    <input type="date" name="registration_date_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">اسم الطفل</label>
                    <input type="text" name="child_name_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">العمر</label>
                    <input type="number" name="age_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">الجنسية</label>
                    <input type="text" name="nationality_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">تاريخ الميلاد</label>
                    <input type="date" name="dob_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">هاتف المنزل</label>
                    <input type="tel" name="home_phone_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">جوال الأم</label>
                    <input type="tel" name="mother_mobile_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">جوال الأب</label>
                    <input type="tel" name="father_mobile_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">الرقم الشخصي</label>
                    <input type="text" name="id_number_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">اسم الأب</label>
                    <input type="text" name="father_name_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">اسم الأم</label>
                    <input type="text" name="mother_name_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">عمل الأب</label>
                    <input type="text" name="father_job_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">عمل الأم</label>
                    <input type="text" name="mother_job_ar" className="w-full border border-gray-300 p-2 rounded-md" />

                    <label className="block font-semibold mb-1 mt-3">المدرسة السابقة</label>
                    <input type="text" name="previous_school_ar" className="w-full border border-gray-300 p-2 rounded-md" />
                </div>

                {/* Medical Section */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Does your child suffer from any medical condition? | هل يعاني طفلك من أي حالة مرضية؟
                    </label>
                    <select name="medical_condition" className="w-full border border-gray-300 p-2 rounded-md">
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
                    <input type="text" name="declarer_name" placeholder="Full Name | الاسم" className="w-full border border-gray-300 p-2 rounded-md mt-2" />
                    <input type="text" name="signature" placeholder="Signature | التوقيع" className="w-full border border-gray-300 p-2 rounded-md mt-2" />
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md">
                        Submit | إرسال
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
