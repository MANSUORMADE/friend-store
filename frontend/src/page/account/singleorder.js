import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './account.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fatchOrders } from '../../redux/ordersRedux';
import Animation from '../../componat/animation/animation';
import noimg from "./../../images/noimg.png"
import { ToastContainer,toast } from 'react-toastify';
import newRequest from '../../utils/newRequest';

const TheOrder = () => {


  const { id } = useParams()
  const dispatch = useDispatch()
  const [loding, setLoding]= useState(false)
  const {order , status} = useSelector((state) => state.orders); 

  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fatchOrders());
    }
  },[status, dispatch])
    

  if (status === 'loading') return <Animation />;
  
  if (!order) return <p>المنتج غير موجود</p>;
  
  const product = order.find(i=>i._id === id)
  if(!product) return <p>المنتج غير موجود</p>;
 
  const stoporder = async ()=> {
    setLoding(true)
    try {
      const res = await newRequest.put(`orders/${product.id}`,{...product, works: false, sortOrder: "تم الغاء"})
      toast.success("تم الغاء الطلب")
      dispatch(fatchOrders());
      setTimeout(()=> {
        setLoding(false)
      },1000)
    } catch(err) {
     setLoding(false)
      if(err.message === "Network Error") return toast.error(err.message)
        toast.error(err.response.data)
    }
  }
  return (
    <div className="single-order">
      {loding && <Animation />}
      <ToastContainer />
  <h3>تفاصل الفاتورة </h3>
  <div className='user-detals-order'>{console.log(product)}
      <main><span>رقم الطلب</span><span>{product.idOrder}</span></main>   
      <main><span> تاريخ</span><span>{product.time.dateYMD+ product.time.dateAR}</span></main>   
      <main><span>الأسم</span><span>{product.account.username}</span></main>   
      <main><span>بريد الإلكتروني</span><span>{product.account.email}</span></main>   
      <main><span>رقم الهاتف</span><span>{product.account.phone || "فارغ"}</span></main>     
      <main><span>تعليغ</span><span>{product.account.thankorder || "فارغ"}</span></main>
      <main><span>طريق الدفع </span><span>{product.whoToPay || null}</span></main>   
      <main><span>مبلق المدفع</span><span>{product.theBayMony || null}</span></main>   
      <main><span>رقم العملية </span><span>{product.numberbay || "لا يوجد"}</span></main> 
      <main><span>قسيمة</span><span>{product.discount && product.codeDiscount || "لا يوجد"}</span></main> 
      <main><span>حالة الطلب</span><span>{!product.works ? "تم الغاء": product.sortOrder}</span></main> 
  </div>
    <h3>تفاصل الطلب </h3>

            {product.carts.map((e,i)=>(
                <div key={i} className='box'>
                  <div className='img' ><img src={e.img || noimg} /></div>
                  <div className='box-info'>
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
    <div colSpan={5} >المجموع:</div>
    <div>{product.discount && "ناقص القسيمة"}</div>
    <div>{Number(product?.totalPriceOrder).toLocaleString()}.ح.س</div>
  </div>
</div>
  )
}

export default TheOrder;