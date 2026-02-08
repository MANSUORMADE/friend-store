import { useNavigate, useParams } from 'react-router-dom';
import './admin.scss';
import newRequest from '../../utils/newRequest';
import { useEffect, useState } from 'react';
import Success from '../../componat/succas/success.js';
import Animation from '../../componat/animation/animation';
import noimg from './../../images/noimg.png'
import { ToastContainer, toast } from 'react-toastify';
const TheOrder = () => {
  const Navigate = useNavigate()
  const { id } = useParams()
  
  const [loding, setLoding]= useState(false)
  const [idcart, setIdcart]= useState()
  const [items, setItems]= useState([])
  const [singleorder, setSingleRder]= useState('')
  const [success, setSuccess]= useState({color: '', message: ''})
  const [cart, setCart]= useState()
  const gedivataallUser = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.get(`orders/single/${id}`)
      setSingleRder(res.data)
      setLoding(false)
    } catch(err) {
      setLoding(false)
       if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
  useEffect(()=> {
    gedivataallUser()
  },[])
  if (loding) return <Animation />
  
  if (!singleorder) return <p>المنتج غير موجود</p>;
  
  const stoporder = async ()=> {
    setLoding(true)
    try {
      const res = await newRequest.put(`orders/${singleorder._id}`,{...singleorder, works: false, sortOrder: "تم الغاء"})
      toast.success(res.data)
      gedivataallUser()
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
        }

      }
      try {
        const res = await newRequest.put(`orders/${singleorder._id}`,oop)
        toast.success(res.data)
        setCart('')
        gedivataallUser()
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
                  <div className='img' ><img src={e.img || noimg} /></div>
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
                <input type='color' value={success.color} name="color" onChange={handleChange} />
                <input type='text' value={success.message} name="message" onChange={handleChange} />
                <button onClick={()=>addcartserver()}>أضافة للطلب في السيرفر</button>
                <button onClick={()=>deletOrder(singleorder._id)}>حذف الطلب من السيرفر</button>
            </div>
      </div>
</div>
  )
}

export default TheOrder;