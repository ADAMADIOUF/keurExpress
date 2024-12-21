import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email address'],
    },
    description: {
      type: String,
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
    website: {
      type: String,
    },
    about: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const Agent = mongoose.model('Agent', agentSchema)

export default Agent
