import React, { useEffect,  useState } from 'react';
import './Orders.scss'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link, } from "react-router-dom"
import { resetCart } from '../../redux/cartProduc';
import { fatchOrders } from '../../redux/ordersRedux';
import {useSelector,useDispatch } from 'react-redux'
import { totalPrice } from '../../utils/totalPrice.js';
import ForBay from '../../componat/forBay/forbay';
import AddCardIcon from '@mui/icons-material/AddCard';
import Animation from '../../componat/animation/animation';
import newRequest from '../../utils/newRequest';
import uploadUser from '../../utils/update.js';
import {createTime} from '../../utils/date.js';

const Orders = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const products = useSelector(state => state.cart.products)
  
  const [checkboxe, setCheckboxe]= useState(false)
  const [loding, setLoding]= useState(false)
  const [getBay, setGetBay] = useState({
    sortBay: '',
    sort: '',
    name: '',
    numbay: '',
    numBank: '',
    isbay: ''
  })
  const [openbay, setOpenBay] = useState('')
  const [thankorder, setThankorder] = useState('')
  const [discount, setDiscount] = useState({
    hove: false,
    code: '',
    rate: 0,
  })
  useEffect(()=> {
  }, [dataUser]);
  if(!dataUser) return <div className='nofountf'><Link to="/login">تسجيل دخول</Link></div>
const isForBay = getBay.sortBay === "دفع الأن" ?  getBay.numbay : getBay.sortBay
const isFormValid = checkboxe  && isForBay
const SubmitOrdre = async (e)=> {
  e.preventDefault();
  setLoding(true)
    const  {money, img,startTime, ...userinfo} = {...dataUser,thankorder}
      if(getBay.sortBay === "المحفظة") {
        if(+dataUser.money <= totalPrice(products)) {
          toast.error("رصيد غير كافي")
          return setLoding(false)
        }
      }
        const getTime = createTime(new Date().toISOString()) 
        let oop = { 
          isDiscount:discount,
          time: getTime.createTime,
          sortBayOrder: "في الأنتظار",
          account: userinfo,
          carts: products,
          totalPriceOrder: totalPrice(products),
          whoToPay: getBay.sortBay,
          numberbay:   getBay.sortBay === 'دفع الأن' ? getBay.numbay : getBay.sortBay,

          theBayMony: getBay.sortBay === 'دفع الأن' ? `دفع من ${getBay.sort}` : totalPrice(products) ,
        }
        try { 
          const res = await newRequest.post(`orders`, oop)
          localStorage.setItem("dataCart", null)
          toast.success(res.data)
          dispatch(resetCart())
          dispatch(fatchOrders());
            setLoding(false)
            uploadUser()
            Navigate("/account/user-order")
        } catch(err) {
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
        }
}
const closed = ()=> {
  setOpenBay(false)
}
const getdataforbayFuctio = (e)=> {
  setGetBay({...getBay,...e})
  closed()
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
  return (
    <div className="orders">
       {loding && <Animation />}
         <ToastContainer />
        <div className="container">
            <form onSubmit={(e)=>SubmitOrdre(e)}>
                <div className="top">
                    <div>هل لديك قسيمة </div>
                    <input type='text' value={discount.code} onChange={e=>setDiscount({...discount,code:e.target.value})} placeholder='اكتب كود الخصم هنا'  />
                    <div className='bt' onClick={()=>postCode("test")}>تأكيد</div>
                </div> 
                <ul className='user-monye'>
                  <li> <span>المجموعة</span> <span>ج.س.{Number(totalPrice(products)).toLocaleString()}</span> </li>
                  <li> <span>الأجمالية</span> <span>ج.س.{Number(totalPrice(products) - ((totalPrice(products) * +discount.rate) / 100)).toLocaleString()}</span> </li>
                  <li><span>الرصيدك</span> <span>ج.س.{Number(dataUser?.money).toLocaleString()}</span>  </li>
                </ul>
                <textarea  value={thankorder}  onChange={e=>setThankorder(e.target.value)} placeholder="ملاحظات للطلب (اختياري)" id="" cols="30" rows="3"></textarea>
                <div className="joset">
                      <h2>أختار طريق الدفع</h2>
                      <div className="choosePay">
                          <div className="number">
                            <input   type="radio" id="sortBay1"  name="sortBayBay" required onChange={e=>setGetBay({...getBay,sortBay:e.target.value})} value="المحفظة" />
                            <label htmlFor="sortBay1">من المحفظة</label>
                          </div>
                          <div className="number">
                            <input type="radio" id="sortBay2" name="sortBayBay"required onChange={e=>setGetBay({...getBay,sortBay:e.target.value})} value="دفع الأن"  />
                            <label htmlFor="sortBay2">دفع الأن</label>
                          </div>
                      </div>
                      {getBay.sortBay === "دفع الأن" &&  
                      <div  className="chous-for-bay">
                        <div className='name-numbay'>
                          <div>{getBay.numBank} :</div>
                          <div>{getBay.name}</div>
                        </div>
                        <div className='is-bay'>
                          {openbay && <ForBay getData={(e)=>getdataforbayFuctio(e)} closed={()=>closed()} />}
                          <AddCardIcon onClick={()=>setOpenBay(true)} />
                          <p>{getBay.sort ? (`طريقك الدفع هو ${getBay.sort}`)  : 'عليك اختياري طريق الدفع'}</p>
                          <input type="text" required  onChange={e=>setGetBay({...getBay, numbay:e.target.value})}  placeholder={`رقم العملية  `} />
                        </div>
                      </div>
                      }
                </div>
              <div>
                <div className="checkbox">
                    <input type="checkbox" name='userChak'  onChange={()=>setCheckboxe(!checkboxe)} required id="checkbox"  />
                    <label htmlFor="checkbox">موافق على الشروط</label>
                  </div>
              </div>
                <button  disabled={ !isFormValid }  >أتمام الطلب</button>
            </form>
        </div>
    </div>
  )
}

export default Orders;