import express from "express";
import {
    postProduces, 
    getProduces, 
    putProduces,
    deleteProduces 
} from "../controllers/produces.controller.js";

const router = express.Router();

router.post("/", postProduces)
router.put("/:id", putProduces)
router.get("/", getProduces)
router.delete("/:id", deleteProduces)
export default router;