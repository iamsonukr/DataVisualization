import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.config.js';
import 'dotenv/config'
import customerRouter from './routes/cutomer.route.js';
import orderRoute from './routes/order.route.js';


const PORT=5000;
const app=express()

app.use(express.json())
app.use(cors())
connectDB()

app.use('/api/customer',customerRouter)
app.use('/api/order',orderRoute)

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

app.listen(PORT,()=>{
    console.log("App is listening")
})