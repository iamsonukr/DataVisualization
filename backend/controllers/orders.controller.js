import orderModel from "../models/order.model.js"


const getOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,data:orders})
        console.log(orders)
    } catch (error) {
        console.log(error)
    }
}

export {getOrders}