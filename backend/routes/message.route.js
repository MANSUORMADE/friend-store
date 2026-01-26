import express from "express";
import { 
    getMessage,
    getsingleorder,
    postMessage, 
    putMessage ,
    deleteMessage 
} from "../controllers/message.controller.js";


const router = express.Router();

router.post("/", postMessage)
router.get("/", getMessage)
router.post("/post", getsingleorder)
router.delete("/:id", deleteMessage)
router.put("/mess/:id", putMessage)
export default router;