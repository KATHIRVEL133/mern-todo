import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signUpRoute from './routes/auth.route.js'
const app = express();
dotenv.config();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.listen(PORT,()=>
{
    console.log(`Server is running successfully on the port ${PORT}`)
})
app.use('/api/auth',signUpRoute)
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(error);
});
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