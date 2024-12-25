import React, { useState } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    subject: '',
    phone: '',
    description: '',
    address: '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        First Name: ${formData.firstName}
        Subject: ${formData.subject}
        Phone Number: ${formData.phone}
        Address: ${formData.address}
        Description: ${formData.description}`
      setIsFormSubmitted(true)

      // Send the form data to the API or perform your logic here
      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      // Reset form data after successful submission
      setFormData({
        firstName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
      })

      // Show success message and reset the form after 10 seconds
      setTimeout(() => {
        setIsFormSubmitted(false) // Hide success message
        setFormData({
          firstName: '',
          subject: '',
          phone: '',
          description: '',
          address: '',
        }) // Reset form
      }, 10000) // 10 seconds delay before resetting form
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <div className='contact-form section-center'>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='form-contact'>
          <div className='form-contact-container'>
            <article>
              <div>
                <h3>Name</h3>
                <input
                  type='text'
                  placeholder='Enter your name'
                  id='firstName'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                  className='form-input'
                />
              </div>
              <div>
                <h3>Phone</h3>
                <input
                  type='text'
                  placeholder='Enter your number'
                  id='phoneNumber'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className='form-input'
                />
              </div>
            </article>
            <article>
              <div>
                <h3>Email</h3>
                <input
                  type='email'
                  placeholder='Enter your email here'
                  id='Email'
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                  className='form-input'
                />
              </div>
              <div>
                <h3>Subject</h3>
                <input
                  type='text'
                  placeholder='Write your subject'
                  id='Subject'
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className='form-input'
                />
              </div>
            </article>
            <article>
              <div>
                <h3>Message</h3>
                <textarea
                  name=''
                  placeholder='Write your message'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='form-input'
                ></textarea>
              </div>
            </article>
          </div>
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
      {isFormSubmitted && !isError && (
        <div className='success-message'>
          The message has been sent successfully! We will respond to you soon.
        </div>
      )}
    </div>
  )
}

export default ContactForm
