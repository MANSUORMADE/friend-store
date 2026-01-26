import express from "express";
import { getOrder,getFilterOrder ,postOrder,getsingleorder, putOrder ,deleteOrder } from "../controllers/orders.controller.js";


const router = express.Router();

router.post("/", postOrder)
router.put("/:id", putOrder)
router.get("/", getOrder)
router.get("/filter/:id", getFilterOrder)
router.get("/single/:id", getsingleorder)
router.delete("/:id", deleteOrder)
export default router;