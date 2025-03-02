import mongoose from "mongoose";

export const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://yathavan:Yathuyathav421@cluster0.ccgv0.mongodb.net/blogger')
}
console.log("DB Connected");
