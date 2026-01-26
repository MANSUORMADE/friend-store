import Discount from '../models/discount.model.js'
import User from '../models/user.model.js'
export const getdiscount = async (req, res)=> {
    try {
        const data = await Discount.find()
        res.status(202).send(data)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const postdiscount = async (req, res)=> {
    try {
        const data = req.body
        const getData = Discount.findOne({code : data.code})
        if(!getData) return res.status(404).json( 'هاذا كود الخصم  موجود في البيانات')
        const newDiscount = new Discount({...data})
        await newDiscount.save()
        res.status(201).json("تم أضافة كود الخصم بالنجاح")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const deletediscount = async (req, res)=> {
    try {
        const deleteProduce = await Discount.findById({_id : req.params.id})
        if(!deleteProduce) return res.status(404).json( "هاذا البيانات خير صحيح")
        await Discount.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف القسيمة " )
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putStope = async (req, res)=> {
    try {
        const getData = await Discount.findById(req.params.id)
        if(!getData) return res.status(404).json( 'الكود الخصم لا يوجد')
        getData.work = !getData.work
        await getData.save()
        res.status(201).json("تم توقف الكود")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const postSubscribers = async (req, res)=> {
    try {
        const data = req.body
        const getData = await Discount.findOne({code:data.code})
        if(!getData) return res.status(404).json('الكود الخصم لا يوجد')
        const findUser = await User.findOne({userid:data.id})
        if(!findUser) return res.status(404).json( 'عليك بتعديل بيانات')
        if(!getData.work) return res.status(404).json( 'أنتهاء صلاحية الكود الخصم')
        if(getData.counter <= 0) return res.status(404).json( 'أنتهاء النسبة المستخدمة')
        const findUserd = getData.subscribers.find(e=>+e.id === +data.id)
        if(findUserd) return res.status(404).json( 'لا يمكنك استخدام الكود الخصم اكثر من مرة')
        await getData.save()
        res.status(201).json(getData.rate)
    } catch (err) {
        res.status(499).json("error server")
     }
}