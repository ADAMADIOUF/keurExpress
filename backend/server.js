import express from "express"
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from "./routers/authRoute.js"
import propertieRouter from './routers/propertieRoute.js'
import agentsRouter from './routers/agentRouter.js'
import blogRouter from './routers/blogRouter.js'

dotenv.config()
connectDB()
const app = express()

const port = process.env.PORT || 5000
// Middleware setup

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 

app.use('/api/users', authRouter)

app.use('/api/properties', propertieRouter)
app.use('/api/agents', agentsRouter)
app.use('/api/blogs', blogRouter)




app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})