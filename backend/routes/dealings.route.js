import express from "express";
import {
    postDealings, 
    getDealings, 
    putDealings,
    getSingle,
    deleteDealings 
} from "../controllers/dealings.controller.js";

const router = express.Router();

router.post("/", postDealings)
router.put("/:id", putDealings)
router.get("/", getDealings)
router.get("/single/:id", getSingle)
router.delete("/:id", deleteDealings)
export default router;