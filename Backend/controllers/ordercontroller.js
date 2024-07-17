import orderModel from "../models/OrderModel.js";
import userModel from "../models/usermodel.js";
// import stripe from "stripe";
// import Razorpay from "razorpay";



const placeorder = async (req,res) =>{
    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        console.log("hii");

        res.json({success:true,session_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//user orders

const userorders =async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: "Error"})
    }
}

const updatestatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {placeorder,verifyOrder,userorders,listOrders,updatestatus};

