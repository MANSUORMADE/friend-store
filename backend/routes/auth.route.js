import express from "express";
import {register, login, logout, admined,forgod,updatepassword } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/register", register)
router.post("/reast", forgod)
router.post("/login", login)
router.post("/logout", logout)
router.get("/admin/:id", admined)
router.post("/updatepassword", updatepassword)
export default router;