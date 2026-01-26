import express from 'express';
import { uploadSingle, uploadImage,getImage,deleteImage } from '../controllers/img.controller.js';

const router = express.Router();

router.post('/', uploadSingle, uploadImage);
router.get('/', getImage);
router.delete('/:id', deleteImage);

export default router;
