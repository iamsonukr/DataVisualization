import express from 'express'
import { getCustomer, getOrders, getProducts } from '../controllers/shopify.controller.js'

const shopifyRouter=express.Router()

shopifyRouter.get('/customers',getCustomer)
shopifyRouter.get('/orders',getOrders)
shopifyRouter.get('/products',getProducts)



export default shopifyRouter