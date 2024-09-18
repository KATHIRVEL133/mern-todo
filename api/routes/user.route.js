import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {getUserTodo,existTodo,updateTodo, createTodo} from '../controllers/getUser.controller.js'
import { updateUser } from "../controllers/signUp.controller.js";
const router = express.Router();
router.get('/existUserTodo/:id',verifyUser,existTodo);
router.get('/getUserTodo/:id',verifyUser,getUserTodo);
router.post('/update/:id',verifyUser,updateTodo);
router.post('/create',verifyUser,createTodo);
router.post('/updateUser/:id',verifyUser,updateUser);
export default router;