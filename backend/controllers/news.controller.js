import News from './../models/news.model.js'
export const getnews = async (req, res)=> {
    try {
        const data = await News.find()
        res.status(202).send(data)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const postnews = async (req, res)=> {
    try {
        const data = req.body
        const find = await News.findOne({userid:data.userid})
        if(find && !data.isSeller) return res.status(404).json( "لا يمكنك نشر اكثر من منشر واحد او حذف منشور لي النشر")
        const newNews = new News({...data})
        await newNews.save()
        res.status(201).json("تم أضافة المنشور بالنجاح")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const deletenews = async (req, res)=> {
    try {
        const deletenews = await News.findById({_id : req.params.id})
        if(!deletenews) return res.status(404).json( "هاذا البيانات خير صحيح")
        await News.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف واحد من طلبات ")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putnewslink = async (req, res)=> {
    try {
        const {userid} = req.body
        const finded = await News.findById(req.params.id)
        if(!finded) return res.status(404).json( 'هاذا منشور غير موجود في البيانات')
        if(finded.link.find(e=>+e == +userid)) return res.status(404).json( 'لا يمكن أضافة أعجاب مرة ثانية')
        finded.link.push(userid)
        await finded.save()
        res.status(201).json("تم أضافة لأيك في المنشور")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putnewscaption = async (req, res)=> {
    try {
        const data = req.body
        const finded = await News.findById(req.params.id)
        if(!finded) return res.status(404).json( 'هاذا منشور غير موجود في البيانات')
        finded.caption.push(data)
        await finded.save()
        res.status(201).json("تم أضافة تعليق في المنشور")
    } catch (err) {
        res.status(499).json("error server")
     }
}