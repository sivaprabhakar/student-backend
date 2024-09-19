import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import studentRoutes from './src/routes/studentRoutes.js'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', studentRoutes);

dotenv.config()

app.listen(PORT,()=>console.log(`server is running on ${PORT}`))
