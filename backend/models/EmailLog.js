import mongoose from 'mongoose'

const EmailLogSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

const EmailLog = mongoose.model('EmailLog', EmailLogSchema)
export default EmailLog
