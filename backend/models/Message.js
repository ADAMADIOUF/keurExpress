import mongoose from "mongoose"
const MessageSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Ensure a message is directed to a specific user
    },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model('Message', MessageSchema)

export default Message
