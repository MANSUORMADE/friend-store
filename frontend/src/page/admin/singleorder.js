import { useNavigate, useParams } from 'react-router-dom';
import './admin.scss';
import newRequest from '../../utils/newRequest';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fatchadminOrder } from '../../redux/orders.js';
import Success from '../../componat/succas/success.js';
import Animation from '../../componat/animation/animation';
import noimg from './../../images/noimg.png'
import { ToastContainer, toast } from 'react-toastify';

import AddTaskIcon from '@mui/icons-material/AddTask';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';


const TheOrder = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const { id } = useParams()
  
  const [loding, setLoding]= useState(false)
  const [idcart, setIdcart]= useState()
  const [items, setItems]= useState([])
  // const [singleorder, setSingleRder]= useState('')
  const [success, setSuccess]= useState({color: '', message: '',num: ''})
  const [cart, setCart]= useState()
    const {order , status} = useSelector((state) => state.adminOrder); 
    useEffect(()=> {
      if(status == 'idle') {
        dispatch(fatchadminOrder());
      }
    },[status, dispatch])
  
  
    if (status === 'loading') return <Animation />;
    if (!order) return <p>المنتج غير موجود</p>;
    const singleorder = order.find(i=>i._id === id)

  if (!singleorder) return <p>المنتج غير موجود</p>;
  
  const stoporder = async ()=> {
    setLoding(true)
    try {
      const res = await newRequest.put(`orders/${singleorder._id}`,{...singleorder, works: false, sortOrder: "تم الغاء"})
      toast.success(res.data)
            dispatch(fatchadminOrder());
      setLoding(false)
    } catch(err) {
      setLoding(false)
       if(err.message === 'Network Error')  return toast.error(err.message)
        toast.error(err.response.data)      }
  }
  const addcartf = async ()=> {
    if(!idcart) return console.log("get number good")  
    const order = singleorder
    const findcart = order.carts.find(i=>+i.id === +idcart)
      findcart.items = items
    }
    const additems = async ()=> {
      if(!idcart) return toast.error("أختار المنتج الأول")
      setCart(items.push(cart))
      setCart('')
    }
    const handleChange = (e) =>  setSuccess(prev=> {  return {...prev, [e.target.name]: e.target.value} })

    const addcartserver = async ()=> {
      setLoding(true)
      const oop ={
        ...singleorder, works: true, 
        annul: false, 
        sortOrder: {
          color: success.color,
          message: success.message,
          num: success.num,
        }

      }
      try {
        const res = await newRequest.put(`orders/${singleorder._id}`,oop)
        toast.success(res.data)
          dispatch(fatchadminOrder());
        setCart('')
        setLoding(false)
      } catch(err) {
        setLoding(false)
        if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
    }
    const deletOrder = async id => {
      setLoding(true)
      try {
        const res = await newRequest.delete(`orders/${id}`)
        toast.success(res.data)
        setLoding(false)
        dispatch(fatchadminOrder());
        Navigate("/admin/orders")
      } catch(err) {
        setLoding(false)
       if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
  return (
    <div className="single-order">
      <ToastContainer /> 
      {loding && <Animation />}
  <h3>تفاصل الفاتورة </h3>
    <Success data={singleorder} />
    <h3>تفاصل الطلب </h3>

            {singleorder.carts.map((e,i)=>(
                <div key={i} className='box'>
                  <div className='img' ><img onClick={e=>e.target.classList.toggle("bik")}  src={e.img || noimg} /></div>
                  <div className='box-info'>
                            <div className='f'>{e.id}</div>
                      <div className='cart'>
                        <div className='f-c'>
                            <div className='f'>{e.sort}</div>
                            <div className='f'>{e.title}</div>
                        </div>
                        <div className='f-c'>
                            <div className='f'>{e.item}</div>
                            <div className='f'>{Number(e.price).toLocaleString()}</div>
                        </div>
                        <div className='f-c'>
                            <div className='f'>{e.amount} X </div>
                            <div className='f'>{Number(+e.price * +e.amount).toLocaleString()}</div>
                        </div>
                      </div>
                        {e.skills && 
                          <div className='info'>
                            <div className='bi'>
                              <div>رقم الحساب</div>
                              <div>{e.skills.numberAccount}</div>
                            </div>
                            <div className='bi'>
                              <div>الأسم</div>
                              <div>{e.skills.nameAccunt}</div>
                            </div>
                            <div className='bi'>
                              <div>نوع</div>
                              <div>{e.skills.cats}</div>
                            </div>
                          </div>
                        }
                    <ul>
                      {e.items && e.items.map((s,o)=> (
                      <li key={o}> | {s} | </li>
                    ))}
                      </ul>
                  </div>
                </div>
              ))}
      <div className='total'>
          <div colSpan={6} >المجموع:</div>
          <div>{Number(singleorder.totalPriceOrder).toLocaleString()}.ح.س</div>
      </div>
      <div className='add-order'>
              <div className='inpu'>
                  <input type="text" placeholder='الأيدي المنتج' value={idcart}  onChange={e=>setIdcart(e.target.value)} />
                  <input type="text" placeholder='أضافة للمنتج'  value={cart} onChange={e=>setCart(e.target.value)}   />
                  <button onClick={()=>additems()}>أضافة للطلب</button>
                  <button onClick={()=>setItems([])}>حذف</button>
              </div>
              <div>{items}</div>
            <div className='butt'>
                <button onClick={()=>addcartf()}>أضافة للطلب</button>
            <div style={{display: 'flex'}}>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "saven"})}><AddTaskIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "one"})}><CheckCircleIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "three"})}><AutorenewIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "tow"})}><HourglassBottomIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "for"})}><ReportIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "fave"})}><PriorityHighIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "six"})}><WarningAmberIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: "eite"})}><NotificationImportantIcon/></div>
                <div style={{cursor: "pointer", color:success.color || ''}} onClick={()=>setSuccess({...success, num: ""})}><ErrorIcon/></div>
                <input type='color' value={success.color} name="color" onChange={handleChange} />
                <input type='text' value={success.message} name="message" onChange={handleChange} />
            </div>
                <button onClick={()=>addcartserver()}>أضافة للطلب في السيرفر</button>
                <button onClick={()=>deletOrder(singleorder._id)}>حذف الطلب من السيرفر</button>
            </div>
      </div>
</div>
  )
}

export default TheOrder;