import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
import ordersRouter from "./routes/orders.route.js"
import newsRouter from "./routes/news.route.js"
import messageRouter from "./routes/message.route.js"
import authRouter from "./routes/auth.route.js"
import imageRoutes from './routes/img.route.js';
import producesRouter from "./routes/produces.route.js"
import DiscountRouter from "./routes/discount.route.js"
import DealingsRouter from "./routes/dealings.route.js"

dotenv.config()
const app = express()
const API = process.env.APISERVER || 1011
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
      console.log('connected to mongoDB')
  } catch (error) {
      console.log(error, 'is not connected')
  }
}

app.use('/api/upload', imageRoutes);
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/news", newsRouter)
app.use("/api/message", messageRouter)
app.use("/api/produces", producesRouter)
app.use("/api/discount", DiscountRouter)
app.use("/api/dealings", DealingsRouter)

app.listen(API, ()=> {
  connect()
    console.log(`backend server is runnin http://localhost:${API}`)
})