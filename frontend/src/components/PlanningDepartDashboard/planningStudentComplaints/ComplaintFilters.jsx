import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaFilter, FaFileExport, FaSearch } from 'react-icons/fa'

const ComplaintFilters = ({
  filterStatus,
  setFilterStatus,
  filterImpact,
  setFilterImpact,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
  itemsPerPage,
  setItemsPerPage,
  filteredComplaints,
  resetFilters,
  exportData,
  setCurrentPage,
}) => {
  const { t } = useTranslation('adminStudentComplaints')

  // Get items per page options dynamically from JSON
  const itemsPerPageOptions = t('filters.items_per_page_options', { returnObjects: true })

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4'>
        <h2 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
          <FaFilter className='text-gray-500' /> {t('filters.header')}
        </h2>
        <button
          onClick={resetFilters}
          className='text-sm text-[#1a4480] font-medium hover:underline flex items-center gap-1'
        >
          {t('filters.reset')}
        </button>
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Search */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('filters.search')}</label>
          <div className='relative'>
            <input
              type='text'
              placeholder={t('filters.search')}
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm w-full'
            />
            <FaSearch className='absolute top-3 left-3 text-gray-400' />
          </div>
        </div>

        {/* Status */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('filters.status_label')}</label>
          <select
            value={filterStatus}
            onChange={e => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className='border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400'
          >
            <option value='all'>{t('filters.status_all')}</option>
            <option value='pending'>{t('filters.status_pending')}</option>
            <option value='in-progress'>{t('filters.status_in_progress')}</option>
            <option value='resolved'>{t('filters.status_resolved')}</option>
            <option value='rejected'>{t('filters.status_rejected')}</option>
          </select>
        </div>

        {/* Impact */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('filters.impact_label')}</label>
          <select
            value={filterImpact}
            onChange={e => {
              setFilterImpact(e.target.value)
              setCurrentPage(1)
            }}
            className='border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400'
          >
            <option value='all'>{t('filters.impact_all')}</option>
            <option value='physical'>{t('filters.impact_physical')}</option>
            <option value='psychological'>{t('filters.impact_psychological')}</option>
            <option value='social'>{t('filters.impact_social')}</option>
            <option value='academic'>{t('filters.impact_academic')}</option>
          </select>
        </div>

        {/* Type */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('filters.type_label')}</label>
          <select
            value={filterType}
            onChange={e => {
              setFilterType(e.target.value)
              setCurrentPage(1)
            }}
            className='border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400'
          >
            <option value='all'>{t('filters.type_all')}</option>
            <option value='physical'>{t('filters.type_physical')}</option>
            <option value='emotions'>{t('filters.type_emotions')}</option>
            <option value='bullying'>{t('filters.type_bullying')}</option>
            <option value='staff'>{t('filters.type_staff')}</option>
            <option value='learning'>{t('filters.type_learning')}</option>
            <option value='facilities'>{t('filters.type_facilities')}</option>
            <option value='bus'>{t('filters.type_bus')}</option>
            <option value='rights'>{t('filters.type_rights')}</option>
            <option value='other'>{t('filters.type_other')}</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6'>
        <div className='text-sm text-gray-700 text-center sm:text-left'>
          {t('filters.showing', { count: filteredComplaints.length })}
        </div>

        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
          <select
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className='border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 w-full sm:w-auto'
          >
            {Object.keys(itemsPerPageOptions).map(key => (
              <option key={key} value={key}>
                {itemsPerPageOptions[key]}
              </option>
            ))}
          </select>

          <button
            onClick={exportData}
            className='flex items-center justify-center gap-2 bg-[#1a4480] text-white px-4 py-2.5 rounded-lg hover:bg-[#0d3260] transition shadow-sm w-full sm:w-auto'
          >
            <FaFileExport /> {t('filters.export')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComplaintFilters
