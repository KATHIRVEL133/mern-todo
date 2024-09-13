import Todo from "../models/todo.model.js";
import { errorhandler } from "../utils/error.handler.js";
export const getUserTodo = async (req,res,next)=>
{
try
{
    const todo = await Todo.findOne({userRef:req.params.id});
    if(todo)
    {
        return res.status(200).json(todo);
    }
    else
    {
        return errorhandler(404,'Not found');
    }
}
catch(error)
{
    next(error);
}
}
export const existTodo = async (req,res,next)=>
{
try
{
    const todo = await  Todo.exists({userRef:req.params.id});
    console.log(todo);
    if(todo)
    {
        return res.status(200).json('yes');

    }
    else
    {
        return next(errorhandler(404,'Not found'));
    }
}
catch(error)
{
    next(error);
}
}
export const updateTodo = async (req,res,next)=>
{
    try
    {
        const updatedTodo =  await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedTodo);
    }
    catch(error)
    {
        next(error);
    }
}