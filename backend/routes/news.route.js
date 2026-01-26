import express from "express";
import {postnews, getnews, putnewscaption,putnewslink,deletenews } from "../controllers/news.controller.js";


const router = express.Router();

router.post("/", postnews)
router.put("/caption/:id", putnewscaption)
router.put("/link/:id", putnewslink)
router.get("/", getnews)
router.delete("/:id", deletenews)
export default router;