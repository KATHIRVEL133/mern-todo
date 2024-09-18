import express from "express";
import {signup,signin,signOut} from "../controllers/signUp.controller.js";
const router = express.Router();
router.post('/sign-up',signup);
router.post('/sign-in',signin);
router.get('/signOut',signOut);
export default router;