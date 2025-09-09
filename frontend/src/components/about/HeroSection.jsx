import React from 'react'
import { motion } from 'framer-motion'
import { FaRocket, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className='relative h-[90vh] flex items-center justify-center text-white overflow-hidden'>
      {/* Background Image with Motion Effect */}
      <motion.div
        className='absolute inset-0'
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          src='./images/hero-bg.jpeg'
          alt='Students in classroom'
          className='w-full h-full object-cover'
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#1a4480]/60 via-[#1a4480]/85 to-[#1a4480]/70'></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className='relative z-10 max-w-[90%] md:max-w-5xl px-6 flex flex-col items-center text-center'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <h1
          className='text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 
          text-white drop-shadow-lg leading-tight'
        >
          Al Tamkon Comprehensive School
        </h1>

        {/* Tagline */}
        <p className='text-lg md:text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed text-white max-w-3xl'>
          Inspiring growth through{' '}
          <span className='font-semibold'>education</span>,{' '}
          <span className='font-semibold'>care</span>, and{' '}
          <span className='font-semibold'>innovation</span> — shaping tomorrow’s
          leaders today.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className='flex justify-center gap-4 flex-wrap'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Button */}
          <Link to='/contact-us'>
            <button
              data-aos='zoom-in'
              data-aos-delay='400'
              data-aos-duration='800'
              className='flex items-center gap-2 px-6 py-3 
    border border-white text-white font-semibold rounded-full 
    shadow-md transition-all duration-300 
    hover:bg-white hover:text-[#1a4480] hover:shadow-lg'
            >
              <FaPhoneAlt className='text-lg' /> Contact Us
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
