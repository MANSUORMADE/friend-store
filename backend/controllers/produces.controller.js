import Product from './../models/product.model.js'
export const getProduces = async (req, res)=> {
    try {
        const data = await Product.find()
        res.status(202).send(data)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const postProduces = async (req, res)=> {
    try {
        const data = req.body
        const finded = Product.findOne({title : data.title})
        if(!finded) return res.status(404).json( 'هاذا المنتج  موجود في البيانات')
        const newProduct = new Product({...data})
        await newProduct.save()
        res.status(201).json("تم أضافة المنتج بالنجاح")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const deleteProduces = async (req, res)=> {
    try {
        const deleteProduce = await Product.findById({_id : req.params.id})
        if(!deleteProduce) return res.status(404).json( "هاذا البيانات خير صحيح")
        await Product.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف واحد من طلبات " )
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putProduces = async (req, res)=> {
    try {
        const data = req.body
        const finded = await Product.findById(req.params.id)
        if(!finded) return res.status(404).json( 'هاذا المنتج غير موجود في البيانات')
        finded.title = data.title
        finded.img = data.img
        finded.paragraphs = data.paragraphs
        finded.items = data.items
        await finded.save()
        res.status(201).json("تم تعديل المنتج بالنجاح")
    } catch (err) {
        res.status(499).json("error server")
     }
}