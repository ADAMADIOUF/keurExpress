import React, { useState } from 'react'
import { useSendMessageMutation } from '../slices/contactApiSlice'

const MessageList = ({ propertyId }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    message: '',
  })

  const [sendMessage, { isLoading, isSuccess, isError, error }] =
    useSendMessageMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendMessage({ propertyId, messageData: formData })

    if (isSuccess) {
      setIsFormSubmitted(true)
      setTimeout(() => {
        setIsFormSubmitted(false)
        setFormData({
          senderName: '',
          senderEmail: '',
          senderPhone: '',
          message: '',
        })
      }, 10000)
    }
  }

  return (
    <>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='message-list-form'>
          <input
            type='text'
            name='senderName'
            placeholder='Your Name'
            value={formData.senderName}
            onChange={handleChange}
            required
            className='message-list-input-field'
          />
          <input
            type='email'
            name='senderEmail'
            placeholder='Your Email'
            value={formData.senderEmail}
            onChange={handleChange}
            required
            className='message-list-input-field'
          />
          <input
            type='tel'
            name='senderPhone'
            placeholder='Your Phone'
            value={formData.senderPhone}
            onChange={handleChange}
            className='message-list-input-field'
          />
          <textarea
            name='message'
            placeholder='Your Message'
            value={formData.message}
            onChange={handleChange}
            required
            className='message-list-textarea-field'
          ></textarea>
          <button
            type='submit'
            disabled={isLoading}
            className='message-list-submit-button'
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {isError && (
            <p className='error-message'>
              Error: {error?.data?.message || 'Failed to send message'}
            </p>
          )}
        </form>
      )}
      {isFormSubmitted && !isError && (
        <div className='success-message'>
          The message has been sent successfully! We will respond to you soon.
        </div>
      )}
    </>
  )
}

export default MessageList
