import express from 'express'

import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from './routers/authRoute.js'
import propertieRouter from './routers/propertieRoute.js'
import agentsRouter from './routers/agentRouter.js'
import blogRouter from './routers/blogRouter.js'
import messageRouter from './routers/messageRouter.js'
import contactRoute from './routers/contactRouter.js'
import wishlistRoutes from './routers/whislistRouter.js'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

// Connect to the database
connectDB()


const app = express()
const port = process.env.PORT || 5000

// Middleware setup
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests only from React app
    credentials: true, // Allow cookies to be sent with requests
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Route handlers
app.use('/api/users', authRouter)
app.use('/api/form/contact', contactRoute)
app.use('/api/properties', propertieRouter)
app.use('/api/agents', agentsRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/messages', messageRouter)
app.use('/api/wishlist', wishlistRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
