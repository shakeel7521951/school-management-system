import React from "react";

const RegistrationForm = () => {
    return (
        <div className="w-full bg-gradient-to-r from-blue-50/50 to-pink-50/50 px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1c60a3] mb-10">
                    Student Registration Form
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div>
                        <label className="block font-semibold mb-1">Child’s Name</label>
                        <input
                            type="text"
                            name="child_name"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Personal ID Number</label>
                        <input
                            type="text"
                            name="id_number"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>


                    <div>
                        <label className="block font-semibold mb-1">Father’s Name</label>
                        <input
                            type="text"
                            name="father_name"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Father’s Mobile</label>
                        <input
                            type="tel"
                            name="father_mobile"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Father’s Occupation</label>
                        <input
                            type="text"
                            name="father_job"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>



                    <div>
                        <label className="block font-semibold mb-1">Mother’s Name</label>
                        <input
                            type="text"
                            name="mother_name"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Mother’s Mobile</label>
                        <input
                            type="tel"
                            name="mother_mobile"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Mother’s Occupation</label>
                        <input
                            type="text"
                            name="mother_job"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>




                    <div>
                        <label className="block font-semibold mb-1">Home Phone</label>
                        <input
                            type="tel"
                            name="home_phone"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>


                    <div>
                        <label className="block font-semibold mb-1">Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>











                    {/* School Info */}
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-1">Previous School</label>
                        <input
                            type="text"
                            name="previous_school"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    {/* Medical Section */}
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-1">
                            Does your child suffer from any medical condition?
                        </label>
                        <select
                            name="medical_condition"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                        <textarea
                            name="medical_details"
                            className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
                            placeholder="If yes, please explain and attach reports"
                        ></textarea>
                    </div>

                    {/* Declaration */}
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-1">
                            I hereby confirm the above information is correct
                        </label>
                        <input
                            type="text"
                            name="declarer_name"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                        <input
                            type="text"
                            name="signature"
                            placeholder="Signature"
                            className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 text-center mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#224182] to-[#3b63bb] hover:opacity-90 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
