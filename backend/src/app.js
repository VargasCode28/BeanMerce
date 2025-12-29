import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'
import orderRoutes from './routes/order.routes.js'
import productRoutes from './routes/product.routes.js'


import path from 'path'


dotenv.config()
connectDB()

const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)


app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/products', productRoutes)



app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))



app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`)
})