import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.clerkId // Only require password if Clerk ID is not provided
      },
    },
    role: {
      type: String,
      enum: ['seller', 'admin', 'user'],
      default: 'user',
    },
    contactNumber: { type: String },
    clerkId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values to exist while keeping uniqueness
    },
    displayName: { type: String },
    profileImage: {
      type: String,
      default: '/images/default-avatar.png',
    },
    dateJoined: { type: Date, default: Date.now },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

    verificationToken: String,
    verificationExpiresAt: Date,
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
)

// Hash password before saving if modified
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare entered password with stored hash
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
UserSchema.statics.findOrCreateByClerkId = async function(clerkId, email, firstName, profileImage) {
  let user = await this.findOne({ clerkId })

  if (!user) {
    user = await this.create({
      clerkId,
      email,
      name: firstName,
      profileImage,
    })
  }
  return user
}
const User = mongoose.model('User', UserSchema)
export default User
