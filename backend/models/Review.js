import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  datePosted: { type: Date, default: Date.now },
})

const Review = mongoose.model('Review', ReviewSchema)
export default Review
