import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import 'dotenv/config'
import userRouter from './routes/UserRoute.js'
import cardRouter from './routes/cardRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config

const app = express()
const port = 4000

// middleware

app.use(express.json())
app.use(cors())

// database conneciton

connectDB()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/card', cardRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('API Working')
})

app.listen(port, () => {
  console.log(`Server Started on http ://localhost:${port}`)
})
