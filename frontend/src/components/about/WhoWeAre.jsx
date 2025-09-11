import React from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, Users, Building } from 'lucide-react'

const WhoWeAre = () => {
  return (
    <section className='relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-9 px-6 overflow-hidden'>
      {/* Decorative background */}
      <div className='absolute inset-0 bg-gradient-to-tr from-yellow-100/30 via-transparent to-yellow-200/40 opacity-40 pointer-events-none'></div>

      <div className='relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        {/* Left Side - Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className='flex justify-center relative'
        >
          {/* Decorative gradient blob behind */}
          <div className='absolute -top-12 -left-12 w-80 h-80 bg-gradient-to-tr from-blue-300/40 to-yellow-200/50 rounded-3xl rotate-12 blur-2xl opacity-50 hidden md:block'></div>

          {/* Extra accent circle */}
          <div className='absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200/40 rounded-full blur-2xl opacity-60 hidden md:block'></div>

          {/* Image container with gradient border */}
          <div className='relative p-2 rounded-3xl bg-gradient-to-tr from-yellow-200 via-white to-blue-200 shadow-2xl'>
            <img
              src='./images/students.jpg'
              alt='Al Tamkon Comprehensive School community'
              className='relative rounded-2xl object-cover w-full max-w-lg  
    border-4 border-white shadow-xl hover:scale-[1.02] transition duration-500'
            />

            {/* Subtle overlay frame */}
            <div className='absolute inset-0 rounded-2xl ring-2 ring-yellow-300/40 pointer-events-none'></div>
          </div>
        </motion.div>

        {/* Right Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className='text-center md:text-left'
        >
          {/* Heading */}
          <h2 className='text-3xl md:text-4xl font-extrabold mb-4 text-blue-900'>
            Who We Are
          </h2>

          {/* Short Description */}
          <p className='text-base md:text-lg leading-relaxed text-gray-700 mb-6'>
            Established in <span className='font-semibold text-blue-800'>2008</span>,{' '}
            <span className='font-semibold text-blue-900'>Al Tamkon Comprehensive School</span>{' '}
            is Qatar’s pioneering private institution dedicated to{' '}
            <span className='font-medium text-blue-800'>Multiple Intelligences and Talents</span>.  
            We integrate{' '}
            <span className='font-semibold text-blue-900'>academic excellence</span> with{' '}
            <span className='font-semibold text-blue-900'>therapeutic care</span>, creating a nurturing
            environment that supports both learning and personal growth.
          </p>

          {/* Key Highlights */}
          <div className='grid sm:grid-cols-2 gap-5 mt-8'>
            {[
              { icon: Award, label: 'Nationally Accredited' },
              { icon: ShieldCheck, label: 'Licensed in Education & Healthcare' },
              { icon: Users, label: 'Serving 235+ Students' },
              { icon: Building, label: 'Supported by 135+ Staff' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className='flex items-center bg-white/80 rounded-lg p-3 shadow-md border border-yellow-100
                 hover:shadow-lg hover:-translate-y-1 hover:border-yellow-400 transition duration-300'
              >
                <div className='w-12 h-12 flex items-center justify-center rounded-md bg-yellow-100 mr-3'>
                  <item.icon className='w-6 h-6 text-yellow-600' />
                </div>
                <p className='font-semibold text-gray-900 text-base'>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhoWeAre
