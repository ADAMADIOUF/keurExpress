import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

contactSchema.post('save', async function (doc) {
  const emailOptions = {
    to: 'adamadiouf2017@gmail.com', // Replace with recipient's email address
    subject: 'New Contact Form Submission',
    message: `
      First Name: ${doc.firstName}
     Subject: ${doc.subject}
      Phone: ${doc.phone}
      Description: ${doc.description}
      Address: ${doc.address}
    `,
  }

  try {
    await sendEmail(emailOptions)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
