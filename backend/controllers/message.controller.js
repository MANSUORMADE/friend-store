import Message from './../models/message.model.js'
export const getMessage = async (req, res)=> {
    try {
        const data = await Message.find()
        res.status(202).send(data)
    } catch (err) {
       res.status(499).json("error server")
    }
}
export const getsingleorder = async (req, res) =>{
    try {
        const {first, last} =  req.body
        let getData = await Message.findOne({
            about: { $all: [first,last]}
        })
        if (!getData) {
            getData = await Message.create({
                about: [first, last],
                mess: []
            });
        }
        res.status(201).send(getData)
   } catch(err) {
    res.status(499).json("error server message")  
    }
}
export const postMessage = async (req, res)=> {
    try {
        const data = req.body

        const newMessage = new Message({...data})
        await newMessage.save()
        res.status(201).json("تم أضافة المحادثة")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const deleteMessage = async (req, res)=> {
    try {
        const deleteMessage = await Message.findById({_id : req.params.id})
        if(!deleteMessage) return res.status(404).json( "هاذا البيانات خير صحيح")
        await Message.findByIdAndDelete(req.params.id)
        res.status(202).json("تم حذف واحد من طلبات ")
    } catch (err) {
        res.status(499).json("error server")
     }
}
export const putMessage = async (req, res)=> {
    try {
        const data = req.body
        const getData = await Message.findById(req.params.id)
        if(!getData) return res.status(404).json( 'لا يوجد البيانات ')
        getData.mess.push(data)
        await getData.save()
        res.status(201).json("تم الراسال")
    } catch (err) {
        res.status(499).json("error server")
     }
}