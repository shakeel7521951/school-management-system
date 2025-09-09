import React, { useEffect } from 'react'
import ContactPage from '../components/contact/ContactPage'
import OfficeHours from '../components/contact/officeHours'
import ContactMap from '../components/contact/ContactMap'
import AOS from 'aos'


const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false })
  }, [])
  return (
    <div>
      <ContactPage />
      <OfficeHours />
      <ContactMap />
    </div>
  )
}

export default ContactUs