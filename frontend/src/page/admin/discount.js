import { useState } from "react"
import { toast,ToastContainer } from 'react-toastify';
import newRequest from "../../utils/newRequest"
import "./admin.scss"
import { useEffect } from "react"
import Animation from "../../componat/animation/animation";
const Discount = ()=> {

    const [loding, setLoding] = useState(false)
    const [form, setForm] = useState({code: '',rate: 0.1,counter: 0})
    const handlData = (e) =>  setForm(prev=> {  return {...prev, [e.target.name]: e.target.value} })
    const [dataCode, setDataCode] = useState([
        {
            code: "TestCoe",
            counter: 3,
            subscribers: [
                {
                    name: "test test",
                    id: "000000",
                    code: "TestCode"
                }
            ]
        }
    ])

    const getData = async ()=> {
        setLoding(false)
        try{
            const res = await newRequest.get("discount")
            setDataCode(res.data)
            setLoding(false)
        } catch(err) {
            setLoding(false)
            if(err.message === 'Network Error')  return toast.error(err.message)
            toast.error(err.response.data)  
        }
    }

    useEffect(()=>{
        getData()
    })


    const postCode = async e => {
         e.preventDefault();
         setLoding(true)
         if(!form.code) return toast.error("أملا البيانات")
        try{
            const res = await newRequest.post("discount", form)
            setLoding(false)
            toast.success(res.data)
             setForm({code: '',counter: 0})
            getData()
        } catch(err) {
            setLoding(false)
            if(err.message === 'Network Error')  return toast.error(err.message)
            toast.error(err.response.data)  
        }
    }
    const deletDiscount = async e=> {
        setLoding(true)
        try{
            const res = await newRequest.delete(`discount/${e}`)
            toast.success(res.data)
            setLoding(false)
                    getData()
        } catch(err) {
            setLoding(false)
            if(err.message === 'Network Error')  return toast.error(err.message)
            toast.error(err.response.data)  
        }
    }
    const DiscountStope = async e=> {
        setLoding(true)
        try{
            const res = await newRequest.delete(`discount/stope/${e}`)
            toast.success(res.data)
            setLoding(false)
            getData()
        } catch(err) {
            setLoding(false)
            if(err.message === 'Network Error')  return toast.error(err.message)
            toast.error(err.response.data)  
        }
    }
    return(
        <div className="discount">
            {loding && <Animation />}
                <ToastContainer />
            <form onSubmit={postCode} >
                <input type="text"   value={form.code} onChange={handlData} name="code" placeholder="code القسيمة" />
                <input className="input-n" type="rate" value={form.rate} onChange={handlData} name="rate" placeholder="نسبة الخصم" />
                <input className="input-n" type="number" value={form.counter} onChange={handlData} name="counter" placeholder="عدد المشاركين" />
                <button>تأكيد</button>
            </form>
            <h4>التم الأستخدام الكود</h4>
            {dataCode && dataCode.map((e,i)=>(
                <div key={i} className="box">
                    <div className="a-code">
                        <h4>{e.code} : {e.counter}</h4>
                        <div>%{e.rate}</div>
                        <div className="vm" onClick={()=>DiscountStope(e._id)}>stop</div>
                        <div className="vm" onClick={()=>deletDiscount(e._id)}>x</div>
                    </div>
                    {e.subscribers && e.subscribers.map((s,ic)=>(
                        <div key={ic} className="box-code">
                            <div>الاسم : {s.name}</div>
                            <div>id:{s.id}</div>
                            <div className="code">code : {s.code}</div>
                         </div>
                      ))}
                </div>
            ))}
        </div>
    )
}
export default Discount;