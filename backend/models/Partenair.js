import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
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
    address: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    about: {
      type: String,
    },
    image: {
      type: String, // URL to image or file path
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
