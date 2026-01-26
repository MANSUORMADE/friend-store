import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/imgconfig.js';

const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: 'my_uploads', // اسم المجلد في Cloudinary
// //     allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
// //   },
e: console.log('twt')
});

const upload = multer({ storage });
// const upload =  upload.single('image');

export default upload;
