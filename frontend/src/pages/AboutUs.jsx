import React, { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'
import HeroSection from '../components/about/HeroSection'
import WhoWeAre from '../components/about/WhoWeAre'
import OurGoal from '../components/about/OurGoal'
import KeyModules from '../components/about/KeyModules'
import CoreFeatures from '../components/about/CoreFeatures'
import Deliverables from '../components/about/Deliverables'
import { motion } from 'framer-motion'

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div className='w-[100%] overflow-hidden bg-gray-50 text-gray-800 font-inter'>
      {/* Hero Section */}
      <HeroSection />
      <div className='text-center my-12'>
        <motion.button
          whileHover={{
            boxShadow: '0 12px 24px rgba(26, 68, 128, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className='relative inline-block bg-gradient-to-r from-[#1a4480] to-[#153567]
               text-[#facc15] font-semibold px-12 py-4 rounded-full shadow-lg
               text-lg tracking-wide overflow-hidden transition-all duration-300 animate-bounce'
        >
          Upcoming Events
        </motion.button>
      </div>

      {/* Who We Are */}
      <WhoWeAre />
      {/* Our Goal */}
      <OurGoal />
      {/* Key Modules */}
      <KeyModules />
      {/* Core Features */}
      <CoreFeatures />
      {/* Deliverables */}
      <Deliverables />
    </div>
  )
}

export default About
