import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {getUserTodo,existTodo} from '../controllers/getUser.controller.js'
const router = express.Router();
router.get('/existUserTodo/:id',verifyUser,existTodo);
router.get('/getUserTodo/:id',verifyUser,getUserTodo);
export default router;