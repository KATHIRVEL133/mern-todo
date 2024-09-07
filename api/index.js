import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = 3000 || process.env.PORT;
app.listen(PORT,()=>
{
    console.log(`Server is running successfully on the port ${PORT}`)
})
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(error);
})