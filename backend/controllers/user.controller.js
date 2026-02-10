import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
export const getusers = async (req, res) =>{
    try {
        const users = await User.find()
        res.status(202).send(users)
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const fatlte = async (req, res) =>{
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        user.message.falet = false
        await user.save()
        res.status(202).send("Ok")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const addMessage = async (req, res) =>{
    try {
        const { id } = req.params
        const message = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        user.message = {...user.message,...message}
        await user.save()
        res.status(202).send("Ok")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const getTestAdmin = async (req, res) =>{
    try {
        const getData = await User.find()
        const filterTestAdmin = getData.filter(e=>e.testAdmin === true)
        let postData = []
        filterTestAdmin.map(e=>{
            let oop = {
                name: e.username,
                id: e.userid,
                lastMessage: "أهلا بيك في موقع الأصداقاء كيف يمكنن مساعدتك",
            }
            postData.push(oop)
            return postData
        })
        res.status(202).send(postData)
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updateTestAdmin = async (req, res) =>{
    try {
        const { id } = req.params
        const {update} = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        user.testAdmin = !user.testAdmin
        await user.save()
        res.status(201).json("تم التعديل البيانات")
   } catch(err) {
    res.status(499).json("error server")
    }
}

export const getsingleuser = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json( "هاذا المستخدم غير موجود")
        const  {admin,password, ...info} =  user._doc
    res.status(201).send(info)
   } catch(err) {
       res.status(499).json("error server")
    }
}
export const getsingleuserid = async (req, res) =>{
    try {
        const getData = await User.findOne({userid: req.params.id})
        if(!getData) return res.status(404).json( "هاذا المستخدم غير موجود")
        const  {admin,password, ...info} =  getData._doc
        res.status(201).send(info)
   } catch(err) {
       res.status(499).json("error server")
    }
}
export const deleteUser = async (req, res) =>{
    try {
        const User = await User.findOne({id: req.params.id})
        if(!User) return res.status(404).json( 'لا يوجود المستخدم')
        await  User.findByIdAndDelete(req.params.id)
        res.status(201).json("تم حذف المستخدم")
   } catch(err) {
       res.status(499).json("error server")
    }
}
export const increment = async (req, res) =>{
    try {
        const { id } = req.params
        const { num } = req.body
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        user.money += +num
        await user.save()
        res.status(201).json("تم التعديل المستخديم")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const decrement = async (req, res) =>{
    try {
        const { id } = req.params
        const { num } = req.body
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        if(num > user.money) return res.status(405).json("الرصيد غير كافي")
        user.money -= +num
        await user.save()
        res.status(201).json("تم التعديل المستخديم")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updateImg = async (req, res) =>{
    try {
        const { id } = req.params
        const { newimg } = req.body
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        user.img = newimg
        await user.save()
        res.status(201).json("تم التعديل المستخديم")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updatepassword = async (req, res) =>{
    try {
        const { id } = req.params
        const {oldpassword, newpassword} = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        const isMath = await bcrypt.compare(oldpassword, user.password)
        if(!isMath) return res.status(404).json( 'كلمة مرور غير صحيح')
        const hash = bcrypt.hashSync(newpassword,5)
        user.password = hash
        await user.save()
        res.status(201).json("تم التعديل كلمة المرور")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updateemail = async (req, res) =>{
    try {
        const { id } = req.params
        const {oldEmail, newEmail} = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        if(user.email !== oldEmail) return res.status(404).json( 'البيانات غير صحيحة')
        const usernew = await User.findOne({email: newEmail})
        if(usernew) return res.status(404).json( 'هاذا البريد الالكتروني موجود من قبل')
        user.email = newEmail
        await user.save()
        res.status(201).json("تم التعديل البريد الالكترني")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updatephone = async (req, res) =>{
    try {
        const { id } = req.params
        const {oldPhone, newPhone} = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        if(user.phone !== oldPhone) return res.status(404).json( 'البيانات غير صحيحة')
        const usernew = await User.findOne({phone: newPhone})
        if(usernew) return res.status(404).json( 'هاذا  رقم الهاتف موجود من قبل')
        user.phone = newPhone
        await user.save()
        res.status(201).json("تم التعديل رقم الهاتف")
   } catch(err) {
    res.status(499).json("error server")
    }
}
export const updatename = async (req, res) =>{
    try {
        const { id } = req.params
        const {oldName, newName} = req.body
        const user = await User.findById(id)
        if(!user) return res.status(404).json( 'لا يوجد هاذا المستخديم')
        if(user.username !== oldName) return res.status(404).json( 'البيانات غير صحيحة')
        user.username = newName
        await user.save()
        res.status(201).json("تم التعديل اسم المستخدم")
   } catch(err) {
    res.status(499).json("error server")
    }
}
