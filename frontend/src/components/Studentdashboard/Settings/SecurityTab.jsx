import React, { useState } from 'react'
import { Lock, Save } from 'lucide-react'

const SecurityTab = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSave = (e) => {
    e.preventDefault();

    console.log('Password Updated:', { currentPassword, newPassword })

    // Reset fields after saving
    setCurrentPassword('')
    setNewPassword('')
  }

  return (
    <>
      <form onSubmit={handleSave} className='space-y-8 max-w-lg mx-auto'>
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 ">
        <Lock size={22} className="text-[#104C80]" /> Security Settings
      </h2>
        <div className='space-y-4'>
          {/* Current Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Current Password
            </label>
            <input
              type='password'
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder='Enter current password'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104C80] focus:outline-none'
            />
          </div>

          {/* New Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              New Password
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder='Enter new password'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104C80] focus:outline-none'
            />
          </div>

          {/* Save Button */}

            <button
              type='submit'
              className='mx-auto flex items-center justify-center gap-2 bg-[#104C80] text-white font-medium py-2 px-6 rounded-xl hover:bg-[#0c3a63] hover:shadow-lg active:scale-95 transition-all duration-300 shadow-md'
            >
              <Save size={18} /> Update Password
            </button>
        </div>
      </form>
    </>
  )
}

export default SecurityTab
