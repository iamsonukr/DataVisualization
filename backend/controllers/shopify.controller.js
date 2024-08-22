import customerModel from "../models/customer.model.js";
import { MongoClient } from "mongodb";

const uri ="mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connecting Database
const client = new MongoClient(uri);
const connectDB=async()=>{
    try {
        await client.connect();
        console.log("DB connected")
    } catch (error) {
        console.log("Connection failed")
    }
}

const database = client.db("RQ_Analytics"); 

const getCustomer=async(req,res)=> {
    try {
      const collection = database.collection("shopifyCustomers"); 
      const query = {}; 
      const data = await collection.find(query).toArray();
      res.json({success:true,data:data})
    } catch (err) {
      console.error("Error fetching data:", err);
    } 
  }

const getOrders=async(req,res)=> {
    try {
      const collection = database.collection("shopifyOrders"); 
      const query = {}; 
      const data = await collection.find(query).toArray();
      console.log(data)
      res.json({success:true,data:data})
    } catch (err) {
      console.error("Error fetching data:", err);
    } 
  }

const getProducts=async(req,res)=> {
    try {
      const collection = database.collection("shopifyProducts"); 
      const query = {}; 
      const data = await collection.find(query).toArray();
      res.json({success:true,data:data})
    } catch (err) {
      console.error("Error fetching data:", err);
    } 
  }

export{getCustomer,connectDB,getProducts,getOrders}