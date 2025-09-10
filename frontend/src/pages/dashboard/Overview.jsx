import React from 'react'
<<<<<<< HEAD
import Stats from '../../components/dashboard/overview/Stats'
 
const Overview = () => {
  return (
    <div className="w-full md:max-w-5xl md:ms-[24%] px-4 md:px-0">
      <Stats />
      
    </div>
=======
import Stats from '../../components/dashboard/overview/KPICards/Stats'
import VisitorTrendsChart from '../../components/dashboard/overview/DashboardCharts/VisitorTrendsChart'
import ComplaintsPieChart from '../../components/dashboard/overview/DashboardCharts/ComplaintsPieChart'
import DocumentApprovalBarChart from '../../components/dashboard/overview/DashboardCharts/DocumentApprovalBarChart'

const Overview = () => {
  return (
    <>
      {/* Main Content */}
      <div className='max-w-7xl   bg-gray-50 py-4  px-4 flex flex-col gap-10'>
        {/* Page Title */}
        <header>
          <h1 className='text-3xl font-bold text-gray-800'>Overview</h1>
          <p className='text-gray-500 mt-1'>
            A quick snapshot of visitors, complaints, documents, and
            performance.
          </p>
          <hr className='mt-4 border-gray-200' />
        </header>

        {/* KPI Cards */}
        <Stats />

        {/* Charts Section */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white px-6 py-8 rounded-2xl shadow-md h-[350px]'>
            <ComplaintsPieChart />
          </div>

          <div className='bg-white px-6 py-4 rounded-2xl shadow-md border border-gray-100 h-[350px] flex flex-col'>
            <DocumentApprovalBarChart />
          </div>

          {/* Full-width Visitor Trends Chart */}
          <div className='bg-white w-full p-6 rounded-2xl shadow-md border border-gray-100 h-[380px] col-span-1 md:col-span-2'>
            <VisitorTrendsChart />
          </div>
        </section>
      </div>
    </>
>>>>>>> 8fadc1b69ee37ecc39fd0a7d8498afa55ea0ef02
  )
}

export default Overview
