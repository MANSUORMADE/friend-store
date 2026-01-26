import express from "express";
import {
    postdiscount, 
    getdiscount, 
    postSubscribers,
    putStope,
    deletediscount 
} from "../controllers/discount.controller.js";

const router = express.Router();

router.post("/", postdiscount)
router.post("/subscribers", postSubscribers)
router.delete("/stope/:id", putStope)
router.get("/", getdiscount)
router.delete("/:id", deletediscount)
export default router;