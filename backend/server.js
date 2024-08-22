import express from 'express'
import cors from 'cors'
import { connectDB } from './controllers/shopify.controller.js';
import 'dotenv/config'
import shopifyRouter from './routes/shopify.route.js';

const PORT=5000;
const app=express()

app.use(express.json())
app.use(cors())
connectDB()

app.use('/api/shopify',shopifyRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

app.listen(PORT,()=>{
    console.log("App is listening")
})