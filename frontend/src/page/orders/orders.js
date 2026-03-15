import  { useEffect,  useState } from 'react';
import './Orders.scss'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link, } from "react-router-dom"
import { resetCart } from '../../redux/cartProduc';
import { fatchOrders } from '../../redux/ordersRedux';
import {useSelector,useDispatch } from 'react-redux'
import { totalPrice } from '../../utils/totalPrice.js';
import Animation from '../../componat/animation/animation';
import newRequest from '../../utils/newRequest';
import uploadUser from '../../utils/update.js';
import Success from './../../componat/succas/success.js';
import {createTime} from '../../utils/date.js';

const Orders = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const products = useSelector(state => state.cart.products)
  
  const [checkboxe, setCheckboxe]= useState(false)
  const [message, setMessage]= useState('')
  const [loding, setLoding]= useState(false)
  const [thankorder, setThankorder] = useState('')
  const [discount, setDiscount] = useState({hove: false,code: '',rate: 0,})
  useEffect(()=> {
  }, [dataUser]);
  if(!dataUser) return <div className='nofountf'><Link to="/login">تسجيل دخول</Link></div>
const SubmitOrdre = async (e)=> {
  e.preventDefault();
  setLoding(true)
    const  {money, img,startTime, ...userinfo} = {...dataUser,thankorder}
        if(+dataUser.money <= totalPrice(products)) {
          toast.error("رصيد غير كافي")
          return setLoding(false)
        }
        const getTime = createTime(new Date().toISOString()) 
        let oop = { 
          isDiscount:discount,
          time: getTime.createTime,
          sortBayOrder: '',
          sortOrder: {
            message: "في الأنتظار",
            color: "#ffa10f",
            num: "tow"
          },
          account: userinfo,
          carts: products,
          totalPriceOrder: totalPrice(products),
          whoToPay: "المحفظة",
          numberbay:   'المحفظة',
          theBayMony: totalPrice(products) ,
        }
        try { 
          const res = await newRequest.post(`orders`, oop)
          localStorage.setItem("dataCart", null)
          toast.success(res.data.message)
          dispatch(resetCart())
          dispatch(fatchOrders());
          setLoding(false)
          setMessage(res.data.data)

        } catch(err) {
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
        }
}
const postCode = async ()=> {
  if(!dataUser) return toast.error("عليك بتسجل دخول")
  setLoding(true)
  try{
    const res = await newRequest.post(`discount/subscribers`, {
      name: dataUser.username,
      id: dataUser.userid,
      code: discount.code,
    })
    toast.success('تم استخدام الكود الخصم')
    setDiscount({...discount,rate: res.data, have: true})
    setLoding(false)
  } catch(err) {
    setLoding(false)
      if(err.message === "Network Error") return toast.error(err.message)
        toast.error(err.response.data)
    }
}
const closeOrder =()=> {
    setLoding(false)
    setMessage('')
    uploadUser()
    Navigate("/account/user-order")
}
  return (
    <div className="orders">
       {loding && <Animation />}
       {message && (
            <div className="backdrop">
                <div className="outsunupmony">
                <Success data={message} />
                  <button onClick={closeOrder}>تاكيد</button>
                </div>
            </div>
       )}
         <ToastContainer />
         
        <div className="container">
            <form onSubmit={(e)=>SubmitOrdre(e)}>
                <div className="top">
                    <div>هل لديك قسيمة </div>
                    <input type='text' value={discount.code} onChange={e=>setDiscount({...discount,code:e.target.value})} placeholder='اكتب كود الخصم هنا'  />
                    <div className='bt' onClick={()=>postCode("test")}>تأكيد</div>
                </div> 
                <ul className='user-monye'>
                  <li><span>الرصيدك</span> <span>ج.س.{Number(dataUser?.money).toLocaleString()}</span>  </li>
                  <li><h1>طريقة الدفع من المحفظة</h1></li>
                  <li> <span>المجموعة : ج.س{Number(totalPrice(products)).toLocaleString()}</span> <span>الأجمالية : ج.س.{Number(totalPrice(products) - ((totalPrice(products) * +discount.rate) / 100)).toLocaleString()}</span> </li>
                </ul>
                <textarea  value={thankorder}  onChange={e=>setThankorder(e.target.value)} placeholder="ملاحظات للطلب (اختياري)" id="" cols="32" rows="4"></textarea>
              <div>
                <div className="checkbox">
                    <input type="checkbox" name='userChak'  onChange={()=>setCheckboxe(!checkboxe)} required id="checkbox"  />
                    <label htmlFor="checkbox">موافق على الشروط</label>
                  </div>
              </div>
                <button  disabled={ !checkboxe }  >أتمام الطلب</button>
            </form>
        </div>
    </div>
  )
}

export default Orders;