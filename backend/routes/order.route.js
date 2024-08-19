import express from "express"
import { getOrders } from "../controllers/orders.controller.js"



const orderRoute=express.Router()

orderRoute.get('/list',getOrders)

export default orderRoute