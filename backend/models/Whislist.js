import mongoose from 'mongoose'

const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Ensure this references the Property model
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist
