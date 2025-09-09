import React from 'react'
import ContactPage from '../components/contact/ContactPage'
import OfficeHours from '../components/contact/officeHours'
import ContactMap from '../components/contact/ContactMap'

const ContactUs = () => {
  return (
    <div>
      <ContactPage />
      <OfficeHours />
      <ContactMap />
    </div>
  )
}

export default ContactUs