import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not exist"})
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.json({success:false,message:"Enter Valid Password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (err) {
        console.log(err);
        res.json({success:false,message:"Error"})

    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) =>{
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }


        //Validating

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please Enter Strong password"})
        }

        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name: name,
            email:email,
            password:hashpassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser};