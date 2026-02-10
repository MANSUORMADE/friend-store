import Order from "../models/order.model.js"
import { postSubscribers } from "./discount.controller.js"
import Discount from '../models/discount.model.js'
import User from "../models/user.model.js"
import Porduct from "../models/product.model.js"
import { sendTelegramApp, sendWhatsApp} from "./../utils/sendWhatsApp.js"
export const getsingleorder = async (req, res) =>{
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json( "هاذا النوع الطلب غير موجود")
        res.status(201).send(order)
   } catch(err) {
    res.status(499).json("error server")  
    }
}
export const getOrder = async (req, res)=> {
    try {
        const getOeder = await Order.find()
        res.status(202).send(getOeder)
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const getFilterOrder = async (req, res)=> {
    try {
        const getData = await Order.find()
        const filterOrder = getData.filter(i=>i.account._id == req.params.id )
        res.status(202).send(filterOrder)
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const postOrder = async (req, res)=> {
  try {
        const data = req.body
        if(!data) return res.status(402).json( "البيانات الطلب فاضيه")
         let discount = 0
         if(data.isDiscount.have) {
             const getDataDiscount = await Discount.findOne({code:data.isDiscount.code})
             if(!getDataDiscount) return res.status(404).json('الكود الخصم لا يوجد')
            const findUser = await User.findOne({userid:data.account.userid})
            if(!findUser) return res.status(404).json( 'عليك بتعديل بيانات')
            if(!getDataDiscount.work) return res.status(404).json( 'أنتهاء صلاحية الكود الخصم')
            if(getDataDiscount.counter <= 0) return res.status(404).json( 'أنتهاء النسبة المستخدمة')
            const findUserd = getDataDiscount.subscribers.find(e=>+e.id === +data.account.id)
            if(findUserd) return res.status(404).json( 'لا يمكنك استخدام الكود الخصم اكثر من مرة')
            const newsubscribers = {time: new Date(), name:findUser.username, code:data.isDiscount.code ,id: findUser.userid }
            getDataDiscount.subscribers.push(newsubscribers)
            discount = getDataDiscount.rate
            await getDataDiscount.save()
        }
        const allorder = await Order.find()
        const filte = Porduct.find();   

        if(data.whoToPay === "المحفظة") {
            const user = await User.findById(data.account._id)
            if(!user) return res.status(404).json( "البيانات المستخديم غير موجود")
            const datas = user.money >= +data.totalPriceOrder
            if(!datas) return res.status(404).json( "رصيدك غير كافي")
            for(let e=0; e < data.carts.length; e++) {
                for(let a=0; a < filte.length; a++) {
                    if(filte[a].title === data.carts[e].sort) {
                        for(let w=0; w<filte[a].items.length; w++){
                            if(filte[a].items[w].titleProduce === data.carts[e].title ) {
                                for(let q=0; q<filte[a].items[w].cart.length; q++){
                                    const testitme = filte[a].items[w].cart[q].item === data.carts[e].item
                                    if(testitme) {
                                            const testprice = +filte[a].items[w].cart[q].price === +data.carts[e].price
                                            const testfint = filte[a].items[w].cart[q].font
                                            // if(!testitme) return res.status(404).json( "تم تعديل البيانات المنتج في الموقع عليك ازلة البيانات في  العربة"))
                                            if(!testfint) return res.status(404).json( "تم تعديل البيانات في الموقع عليك ازلة البيانات في العربة")
                                            if(!testprice) return res.status(404).json( "تم تعديل البيانات السعر في الموقع عليك ازلة البيانات في  العربة")
                                        }
                                }
                            }
                        }
                    }
                }
            }
            user.money = +user.money - (+data.totalPriceOrder  - (+data.totalPriceOrder * +discount) / 100)
            await user.save()
        } else if(data.whoToPay === "دفع الأن") {
            const filterpostorder = allorder.filter(t=>t.works !== true)
            const findbay =  filterpostorder.find(e=>+e.numberbay === +data.numberbay)
            if(findbay) return res.status(404).json( "رقم العملية موجود من قبل عليك ارسال رقم عملية مختلف لي اتمم الطلب")
            const filte = Porduct.find();
            for(let e=0; e < data.carts.length; e++) {
                for(let a=0; a < filte.length; a++) {
                    if(filte[a].title === data.carts[e].sort) {
                        for(let w=0; w<filte[a].items.length; w++){
                            if(filte[a].items[w].titleProduce === data.carts[e].title ) {
                                for(let q=0; q<filte[a].items[w].cart.length; q++){
                                    const testitme = filte[a].items[w].cart[q].item === data.carts[e].item
                                    if(testitme) {
                                            const testprice = +filte[a].items[w].cart[q].price === +data.carts[e].price
                                            const testfint = filte[a].items[w].cart[q].font
                                            // if(!testitme) return res.status(404).json( "تم تعديل البيانات المنتج في الموقع عليك ازلة البيانات في  العربة")
                                            if(!testfint) return res.status(404).json( "تم تعديل البيانات في الموقع عليك ازلة البيانات في العربة")
                                            if(!testprice) return res.status(404).json( "تم تعديل البيانات السعر في الموقع عليك ازلة البيانات في  العربة")
                                        }
                                }
                            }
                        }
                    }
                }
            }     
        } else return res.status(404).json( "هناك خطا في البيانات")
        const isDiscountb = discount > 0 ? true: false 
        const idOrder = String(allorder.length + 1) + String(new Date().getFullYear())  + Math.ceil(Math.random() * 1000)
        const lastTotalPriceOrder = +data.totalPriceOrder - (+data.totalPriceOrder * +discount) / 100
        const newOrder = new Order({...data, idOrder, totalPriceOrder :  lastTotalPriceOrder,  discount: isDiscountb, codeDiscount:data.isDiscount.code})
      const code = `تم اضافة طلب جديد من ${data.account.userid} رقم الطلب ${data.account.phone} السعر الاجمالي 
      = ${data.totalPriceOrder} طريقة الدفع هو ${data.whoToPay} 
      الزمن :  ${data.time.dateHMS}`
        await sendWhatsApp('249927353157', code);
        await sendTelegramApp(code);
        await newOrder.save()
        res.status(201).json({data: newOrder, message: "تم أضافة الطلب بجاح"})
    } catch (err) {
        res.status(499).json("error server")

    }
}
export const deleteOrder =async (req, res)=> {
      try {
        const deletforbay = await Order.findById(req.params.id)
        if(!deletforbay) return res.status(404).json( "هاذا البيانات خير صحيح")
        await Order.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف واحد من طلبات " )
    } catch (err) {
        res.status(499).json("error server")
    }
}
export const putOrder = async (req, res)=> {
     try {
        const dataorder = req.body
        const fontorder = await Order.findById(req.params.id)
        if(!fontorder) return res.status(404).json( "هاذا النوع الطلب غير موجود")
        fontorder.annul = dataorder.annul
        fontorder.works = dataorder.works
        fontorder.sortOrder = dataorder.sortOrder
        fontorder.carts = dataorder.carts
        await fontorder.save()
        res.status(202).json("تم تعديل الطلب")
    } catch (err) {
        res.status(499).json("error server")
    }
}
