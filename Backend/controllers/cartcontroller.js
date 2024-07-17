import userModel from "../models/usermodel.js";

//add to cart 
const addtocart = async (req,res) =>{
    try {
        let userdata = await userModel.findOne({_id:req.body.userId});
        let cartData = await userdata.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Add to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove from cart 
const removefromcart = async (req,res) => {
    try {
        let userdata = await userModel.findById(req.body.userId);
        let cartData = await userdata.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get cart 
const getcart = async (req,res) =>{
    try {
        let userdata = await userModel.findById(req.body.userId);
        let cartData = await userdata.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addtocart,removefromcart,getcart};

