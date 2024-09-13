import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    todo:{
        type:Array,
        required:true,
    },
   userRef:{
    type:String,
    required:true,
   }
},{
    timestamps:true,
});
const Todo = mongoose.model('Todo',todoSchema); 
export default Todo;