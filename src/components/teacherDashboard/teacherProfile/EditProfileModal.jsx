import React, { useState } from 'react'
import { X } from 'lucide-react'

const EditProfileModal = ({ profile, setProfile, onClose }) => {
  const [formData, setFormData] = useState(profile)
  const [preview, setPreview] = useState(profile.image || '')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = e => {
    e.preventDefault()
    setProfile(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl sm:text-2xl font-bold text-[#104c80]">
            Edit Profile
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSave}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt="Profile Preview"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#104c80]/20 shadow-md"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="px-4 py-2 rounded-lg bg-[#104c80] text-white text-sm sm:text-base font-medium hover:bg-[#0d3a63] transition">
                Change Photo
              </span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {/* Row 1: Name + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none text-sm sm:text-base"
              />
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none text-sm sm:text-base"
              />
            </div>

            {/* Bio full width */}
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none text-sm sm:text-base"
              rows="4"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 min-w-[100px] rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm sm:text-base transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="px-5 py-2 min-w-[100px] rounded-lg bg-[#104c80] text-white font-medium hover:bg-[#0d3a63] text-sm sm:text-base transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
