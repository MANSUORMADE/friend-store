import User from "../models/user.model.js";
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const forgod = async (req, res ) =>{
    try {
        const { email } = req.body
        const user = await User.findOne({email : email});
        if(!user) return res.status(404).json( 'الحساب غير موجود لي')
        const token = jwt.sign({email: user.email}, process.env.JWT_KEY, {expiresIn: '30m'} )
        const link = `${process.env.CLIENT_API}/reast-password/${token}`
        const html = ` <h2>أهلاً بك في Friends Store</h2> <p>اضغط لتأكيد حسابك:</p> <a href="${link}">${link}</a> `;
        await sendEmail(user.email, 'تاكيد حسابك',html )
        res.status(201).json('سوفا نرسل لك رابط في البريد الالكتروني لتغير كلمة المرور')
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const register = async (req, res ) =>{
    try {
        const data = req.body
        const allUser = await User.find() 
        const useremail = await User.findOne({email: req.body.email}) 
        if(useremail) return res.status(404).json( 'البريد الالكتروني موجود من قبل')
        const userphone = await User.findOne({phone: req.body.phone}) 
        if(userphone) return res.status(404).json( 'رقم الموبايل موجود من قبل ')
        const hash = bcrypt.hashSync(data.password,5)
        const newUser = new  User({...data, 
            userid: new Date().getFullYear() + String(allUser.length + 1).padStart(3, '0'),
            password: hash,
        })
    await newUser.save(); 
    const html = ` 
        <h2>أهلاً بك في Friends Store</h2>
        <p>تم تسجل حساب جديد</p>
     `;
    await sendEmail(newUser.email, 'تاكيد حسابك',html )
    res.status(201).json("تم تسجل حساب جديد")
    res.status(201).json(newUser)
   } catch(err) {
    res.status(499).json("error server")
}
}
export const login = async (req, res ) =>{
    try {
        console.log(req.body)
        let user = await User.findOne({email: req.body.email})
        if(!user)  user = await User.findOne({phone: req.body.email})
        if(!user) return res.status(404).json( 'الحساب غير موجود')
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrect) return res.status(404).json( 'كلمة مرور غير صحيح')
        const {password,admin, isWorke,  ...info} = user._doc
        const html = ` <h2>أهلاً بك في Friends Store</h2>
        <p>تم تسجل في الحسابك</p>
         `;
        await sendEmail(info.email, 'تاكيد حسابك',html )
        res.status(201).send(info)
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const logout = (req, res ) =>{
    try {
        res.status(202).json('تم تسجيل خروج')
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const admined = async (req, res ) =>{
    try {
        const adminfoin = await User.findOne({_id: req.params.id})
        if(!adminfoin) return res.status(404).json( 'الحساب غير موجود')
        const isdmin = adminfoin.admin === true
        if(!isdmin) return res.status(404).json( 'انت لست admin')
        res.status(202).send(isdmin)
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const updatepassword = async (req, res ) => {
    try {
        const { token, newpassword } = req.body
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({email: decoded.email});
        if(!user) return res.status(404).json( 'الحساب غير موجود لي')
        user.password = bcrypt.hashSync(newpassword,5)
        await user.save()
        const html = ` <h2>أهلاً بك في Friends Store</h2>
        <p>تم تغير كلمة السر</p>
         `;
        await sendEmail(user.email, 'تاكيد حسابك',html )
        res.status(200).json('تم تغير كلمة السر الأن يمكنك تسجيل دخول')
    }catch (err) {
        res.status(499).json("error server")
    }
}