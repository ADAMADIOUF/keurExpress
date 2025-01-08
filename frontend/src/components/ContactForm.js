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
        Prénom: ${formData.firstName}
        Sujet: ${formData.subject}
        Numéro de téléphone: ${formData.phone}
        Adresse: ${formData.address}
        Description: ${formData.description}`
      setIsFormSubmitted(true)

      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      setFormData({
        firstName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
      })

      setTimeout(() => {
        setIsFormSubmitted(false)
        setFormData({
          firstName: '',
          subject: '',
          phone: '',
          description: '',
          address: '',
        }) // Réinitialiser le formulaire
      }, 10000) // Délai de 10 secondes avant de réinitialiser le formulaire
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi du formulaire:",
        error
      )
    }
  }

  return (
    <div className='contact-form section-center'>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='form-contact'>
          <div className='form-contact-container'>
            <article>
              <div>
                <h3>Nom</h3>
                <input
                  type='text'
                  placeholder='Entrez votre nom'
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
                <h3>Téléphone</h3>
                <input
                  type='text'
                  placeholder='Entrez votre numéro'
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
                  placeholder='Entrez votre email ici'
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
                <h3>Sujet</h3>
                <input
                  type='text'
                  placeholder='Écrivez votre sujet'
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
                  placeholder='Écrivez votre message'
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
            {isLoading ? 'Envoi...' : 'Envoyer le message'}
          </button>
        </form>
      )}
      {isFormSubmitted && !isError && (
        <div className='success-message'>
          Le message a été envoyé avec succès ! Nous vous répondrons bientôt.
        </div>
      )}
    </div>
  )
}

export default ContactForm
