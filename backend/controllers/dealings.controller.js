import Dealings from '../models/dealings.model.js'
export const getDealings = async (req, res)=> {
    try {
        const data = await Dealings.find()
        res.status(202).send(data)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const getSingle = async (req, res)=> {
    try {
        const data = await Dealings.find()
        const isGet = data.filter(i=>+i.userGet.userid === +req.params.id || +i.userPay.userid === +req.params.id)
        res.status(202).send(isGet)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const postDealings = async (req, res)=> {
    try {
        const data = req.body 
        const newDealings = new Dealings({...data})
        await newDealings.save()
        res.status(201).json("تم أضافة  ")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const deleteDealings = async (req, res)=> {
    try {
        const deleteProduce = await Dealings.findById({_id : req.params.id})
        if(!deleteProduce) return res.status(404).json( "هاذا البيانات خير صحيح")
        await Dealings.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف واحد من  " )
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putDealings = async (req, res)=> {
    try {
        const data = req.body
        const finded = await Dealings.findById(req.params.id)
        if(!finded) return res.status(404).json( 'هاذا المنتج غير موجود في البيانات')
        finded.title = data.title
        finded.img = data.img
        finded.paragraphs = data.paragraphs
        finded.items = data.items
        await finded.save()
        res.status(201).json("تم تعديل  بالنجاح")
    } catch (err) {
        res.status(499).json("error server")
     }
}