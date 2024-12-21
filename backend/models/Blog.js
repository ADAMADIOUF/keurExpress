import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: {
      type: [String],
    },
    image: {
      type: String, // URL to image for the blog post
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: {
      type: Number, // Read time in minutes
    },
    publishedDate: {
      type: Date,
      default: Date.now, // Automatically set the current date
    },
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

// Calculate read time based on the number of words in content
blogSchema.pre('save', function (next) {
  const wordCount = this.content.split(' ').length
  this.readTime = Math.ceil(wordCount / 200) // 200 words per minute
  next()
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
