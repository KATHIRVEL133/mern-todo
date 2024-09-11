import jwt from 'jsonwebtoken'
import { errorhandler } from './error.handler.js'
export const verifyUser = (req,res,next)=>
{
    const token = req.cookies.access_token;
    if(!token) return next(errorhandler(401,'Unauthorized'));
    jwt.verify(token,process.env.JSON_TOKEN,(err,user)=>
    {
        if(err) return next(errorhandler(403,'forbidden'));
        req.user = user;
        next();
    })
}