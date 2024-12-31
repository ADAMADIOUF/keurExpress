import mongoose from "mongoose"
const MessageSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
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
