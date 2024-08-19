import express from "express";
import customerModel from "../models/customer.model.js";


const getCustomer=async(req,res)=>{
    try {
        const data=await customerModel.find()
        res.json({success:true,data:data})
        console.log(data)
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export{getCustomer}