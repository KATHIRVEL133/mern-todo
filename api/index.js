import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signUpRoute from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import userRoute from './routes/user.route.js'
import path from 'path'
const __dirname = path.resolve();
const app = express();
dotenv.config();
const PORT =  process.env.PORT||3000;
app.use(express.json());
app.use(cookieParser());
app.listen(PORT,()=>
{
    console.log(`Server is running successfully on the port ${PORT}`)
})
app.use('/api/auth',signUpRoute);
app.use('/api/user',userRoute);
app.use(express.static(path.join(__dirname,'/client/dist')));
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})
app.use((err,req,res,next)=>
{
    const statusCode = err.statusCode||500;
    const message = err.message||'Internal Server Error';
    return res.json({
        success:false,
        statusCode,
        message
    })
})