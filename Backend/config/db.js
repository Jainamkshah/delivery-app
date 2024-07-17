import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Jainam:Jainam2003@deliverycluster.si6ajfm.mongodb.net/delivery-app').then(()=>console.log("DB connected"));
}