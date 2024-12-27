import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },

    datePosted: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['For Sale', 'For Rent'],
      default: 'For Sale',
    },
    propertyType: {
      type: String,
      enum: ['Villa', 'Apartment', 'House', 'Commercial', 'Land'],
      required: true,
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    size: { type: Number, required: true },
    location: {
      city: { type: String },
      address: { type: String },
      lat: { type: Number },
      lng: { type: Number },
      map_url: { type: String },
    },
    isFeatured: { type: Boolean, default: false },
    garage: { type: Boolean, default: false },
    store: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const Property = mongoose.model('Property', PropertySchema)
export default Property
