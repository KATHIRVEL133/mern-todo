import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorhandler } from '../utils/error.handler.js';
import jwt from 'jsonwebtoken';
export const signup = async (req,res,next)=>
{
  const  {username,email,password} = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({username,email,password:hashedPassword});
  try
  {
    await newUser.save();
    return res.status(201).json('New user created successfully');
  }
  catch(error)
  {
    next(error);
  }
}
export const signin = async (req,res,next)=>
{
  const {email,password} = req.body;
  try
  {
  const foundUser = await User.findOne({email});
  if(!foundUser)
  {
    return next(errorhandler(404,'User not found'));
  }
  const passwordVerify = bcryptjs.compareSync(password,foundUser.password);
  if(!passwordVerify)
  {
    return next(errorhandler(403,'Invalid Credentials'));
  }
  const {password:pass,...rest} = foundUser._doc;
  const token = jwt.sign({id:foundUser._id},process.env.JSON_TOKEN);
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
  }
  catch(error)
  {
    next(error);
  }
}
export const updateUser = async (req,res,next)=>
  {
      try
      {
        if(req.body.password)
          {
            req.body.password = bcryptjs.hashSync(req.body.password,10);
          }  
        const updatedUser =  await User.findByIdAndUpdate(req.params.id,{$set:{username:req.body.username,email:req.body.email,password:req.body.password}},{new:true}); 
        const {password,...rest} = updatedUser._doc;
          res.status(200).json(rest);
      }
      catch(error)
      {
          next(error);
      }
  }
  export const signOut = async (req,res,next) =>
    {
    try
    {
    res.clearCookie('access_token');
    res.status(200).json('user signed out successfully');
    }
    catch(error)
    {
        next(error);
    }
    }