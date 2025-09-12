import React, { useState } from 'react'
import { Globe, Sliders, Save } from 'lucide-react'

const PreferencesTab = () => {
  // Local state only for language
  const [language, setLanguage] = useState('English')

  // Handle Save
  const handleSave = e => {
    e.preventDefault()
    console.log('Saved:', { language })

    // Reset after save
    setLanguage('English')
  }

  return (
    <form onSubmit={handleSave} className='space-y-8 max-w-lg mx-auto'>
      {/* Heading */}
      <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
        <Sliders size={24} className='text-[#104C80]' /> Preferences
      </h2>

      {/* Language Selector */}
      <div>
        <label className='text-sm font-medium text-gray-700 flex items-center gap-2 mb-1'>
          <Globe size={18} className='text-gray-500' /> Language
        </label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104C80] focus:border-[#104C80] outline-none transition'
        >
          <option>English</option>
          <option>العربية</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        type='submit'
        className='mx-auto flex items-center justify-center gap-2 bg-[#104C80] text-white font-medium py-2 px-6 rounded-xl 
             hover:bg-[#0c3a63] hover:shadow-lg active:scale-95 transition-all duration-300 shadow-md'
      >
        <Save size={18} /> Save Changes
      </button>
    </form>
  )
}

export default PreferencesTab
