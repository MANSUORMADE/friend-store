import Images from './../models/images.model.js'
import multer from "multer";
import cloudinary from './../utils/imgconfig.js';

const upload = multer({ dest: "uploads" });

export const uploadSingle = upload.single("image");

export const uploadImage =async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "friends-store" // مجلد في Cloudinary
    });
    const newimg = new Images({
      url: result.secure_url,
      public_id: result.public_id
    })
    await newimg.save()
    res.json(result.secure_url);
  } catch (error) {
    res.status(499).json("error server")
  }
};

export const deleteImage = async (req, res) => {
  try {
    const deletimg = await Images.findById(req.params.id)
    if(!deletimg) return res.status(404).json( "هاذا البيانات خير صحيح")
    await cloudinary.uploader.destroy(deletimg.url);
    await Images.findByIdAndDelete(req.params.id)
    res.status(202).json("تم حذف واحد من من صور " )
} catch (err) {
    res.status(499).json("error server")
}
} 
export const getImage = async (req, res) => {
  try {
    const getimg = await Images.find()
    res.status(202).send(getimg)
} catch (err) {
    res.status(499).json("error server")
}
}