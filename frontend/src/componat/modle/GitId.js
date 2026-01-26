import React, {  useState } from 'react'
import "./backdrop.scss"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch } from 'react-redux'
import AddCardIcon from '@mui/icons-material/AddCard';
import ForBay from '../forBay/forbay';
import { useNavigate } from 'react-router-dom';
import { fatchOrders } from '../../redux/ordersRedux';
import Animation from '../animation/animation';
import newRequest from '../../utils/newRequest';
import {createTime} from '../../utils/date.js';

const GetId = ({targetGte}) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const datauser = JSON.parse(localStorage.getItem("dataFriend"))
  const [closeBay, setCloseBay] = useState('')
  const [loding, setLoding]= useState(false)

  const [dataGet, setDataGet] = useState({theMonye: '', numberbay: '', chousbay: '', thankorder: ''})

  const handling = (e) =>  setDataGet(prev=> {  return {...prev, [e.target.name]: e.target.value} })
  
  const isthemonye = dataGet.theMonye > 0
  const isnumberbay = dataGet.numberbay
  const ischousbay = dataGet.chousbay
  const isthankorder = dataGet.thankorder 
  const isSubmint = isthemonye && isnumberbay && ischousbay && isthankorder
  
  const getOrderSundMonye = async e => {
    e.preventDefault();
    setLoding(true)
    const  {money, img,startTime, ...userinfo} = {...datauser,thankorder: dataGet.thankorder}
            const getTime = createTime(new Date().toISOString()) 
            let oop = { 
              sortBayOrder: "في الأنتظار",
              time: getTime.createTime,
              isDiscount:{hove: false, code:'',rate:0},
              account: userinfo,
              carts:[{
                    id: Date.now(),
                    item:  dataGet.theMonye + "س.ج.",
                    price: dataGet.theMonye,
                    pay: "طلب",
                    amount: 1,
                    title: "شحن محفظة",
                    sort: "تغذية",
                    skills: '',
                    items: []
                }],
              totalPriceOrder: dataGet.theMonye,
              whoToPay: "دفع الأن",
              numberbay:   dataGet.numberbay,
              theBayMony: `دفع من ${dataGet.chousbay}` ,
            }
       try {
        const res = await newRequest.post(`orders`, oop)
        toast.success(res.data)
        dispatch(fatchOrders());
          targetGte()
          setLoding(false)
          Navigate("/account/user-order")
      } catch(err) {
        console.log(err)
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
    }
   const closed = ()=> {
    setCloseBay(!closeBay)
  }

  const getdataforbayFuctio = (e)=> {
    console.log(e)
    setDataGet({...dataGet,...e, chousbay: e.sort})
    setCloseBay(!closeBay)
  }
  return (
    <div className="backdrop">
       {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
            <div onClick={()=>targetGte()} className="colos"><ArrowBackIosIcon/></div>
            <form onSubmit={getOrderSundMonye} className='form'>
                <div className='rew'>
                    {closeBay && <ForBay getData={(e)=>getdataforbayFuctio(e)} closed={()=>closed()} />}
                    <AddCardIcon onClick={()=>closed()} />
                    <p>{dataGet.sort ? (`طريقك الدفع هو ${dataGet.sort}`)  : 'عليك اختياري طريق الدفع'}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}} className='getBay'>
                  <div>{dataGet.name}:</div>
                  <div>{dataGet.numBank}</div>
                </div>
                <label htmlFor="setmony"> أدخل المبلق</label>  
                <input id='setmony' name='theMonye' onChange={handling} type="number" />
                <label htmlFor="setmony"> أدخل رقم العملية للشعار</label>
                <input id='setmony' name='numberbay' onChange={handling} type="text" />
                <label htmlFor="thankorder">ملاحظات للطلب اختياري </label>
                <textarea name='thankorder' value={dataGet.thankorder}  onChange={handling} placeholder="ملاحظات للطلب (اختياري)" id="" cols="30" rows="3"></textarea>
                <button disabled={ !isSubmint } >تأكيد</button>
            </form>
        </div>
  </div>
  )
}

export default GetId;






