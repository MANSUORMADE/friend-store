import React, { useEffect, useRef, useState } from 'react'
import './admin.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArchiveIcon from '@mui/icons-material/Archive';
import noimg from './../../images/mystor.png'
import Animation from '../../componat/animation/animation';
import { ToastContainer, toast } from 'react-toastify';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';


const Add = () => {

  const [showProduct, setShowProduct] = useState([]);
  const [loding, setLoding]= useState(false)
  const [updataImte, setUpdataImte]= useState(false)
  const [getFile, setGetFile] = useState('')
  const imgbay = useRef()
  const [paragraphs, setParagraphs] = useState('');

  const [product, setProduct] = useState({title: "", img: "", paragraphs: [], items: []});
  const [items, setItems] = useState({titleProduce: '', sort: "", cart: [], });
  const [cart, setCart] = useState({item: "", price: "",font: false});
  const handlCart = (e)=> setCart(prev =>{ return {...prev, [e.target.name]: e.target.value}})

    const getDataProduct = async ()=> {
      setLoding(true)
      try {
        const res = await newRequest.get(`produces`)
        setShowProduct(res.data)
        setLoding(false)
      } catch (err) {
        setLoding(false)
         if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
    }
    const gitFileAmage = (e)=> {
      setGetFile(e)
      new Image();
      let reader = new FileReader();
      reader.onload = (e) =>   setProduct({...product, img :e.target.result})
      reader.readAsDataURL(e)
    }
    useEffect(()=>{
      getDataProduct()
  },[])
  
  const addCart = () => {
    const find = items.cart.find(w=>w.item === cart.item)
    if(find) {
      find.item = cart.item
      find.price = cart.price
      find.font = cart.font
      console.log(find)
      return
    }
    items.cart.push(cart)
    setCart({item: "", price: ""})
  }
  const addItems = () => {
if(!items.sort) return toast.error("أختار طريق الشحن")
    const fontupdate = product.items.find(e=>e.sort === items.sort)
    if(fontupdate) {
      fontupdate.titleProduce = items.titleProduce
      fontupdate.sort = items.sort
      fontupdate.cart = items.cart
      setProduct({...product})
      setItems({titleProduce: '', sort: "", cart: [], })
    } else {
      product.items.push(items)
      setItems({titleProduce: '', sort: "", cart: [], })
    }
  }
  const addProductToStore = async ()=>  {
    setLoding(true)
    const url = await upload(getFile)
    try {
      const res = await newRequest.post(`produces`,{...product, img: url})
      // toast.success(res.data)
      console.log(res.data)
      // getDataProduct()
      setLoding(false)
    }catch(err){
      setLoding(false)
       if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
  const updateProductToStore = async ()=>  {
    setLoding(true)
    try {
      const res = await newRequest.put(`produces/${product._id}`,product)
      // toast.success(res.data)
      console.log(res.data)
      // getDataProduct()
      setLoding(false)
    }catch(err){
      setLoding(false)
      if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
  const dataPorduct = async id =>  {
    setLoding(true)
    try {
      const res = await newRequest.delete(`produces/${id}`)
      toast.success(res.data)
      setLoding(false)
      getDataProduct()
    }catch(err){
      if(err.message === 'Network Error') {
        toast.error("لا يوجد الأتصال بالأنترنت")
        setLoding(false)
      } else {
        toast.error(err.response.data)
        setLoding(false)
      }
    }
  }
const pp = ()=> {
  product.paragraphs.push(paragraphs)
  setParagraphs('')
}
const changeCart = (gf)=> {
  const filchan = items.cart.find(fc=>fc.item === gf.item)
  filchan.font = !gf.font
  setItems({...items})
}
const deleteCart = se=> {
  const filet = items.cart.filter(e=>e.item !== se)
 setItems({...items, cart:filet})
}
const deleteItems = se=> {
  const filet = product.items.filter(e=>e.titleProduce !== se)
 setProduct({...product, items: filet})
}
const updateItme = ()=> {
  const find = items.cart.find(i=>i._id === cart?._id)
  if(!find) return
  find.item = cart.item
  find.price = cart.price
  setItems({...items})
}

return (
<div className='add'>
        <ToastContainer />
      {loding && <Animation />}
      <div className="sections">
        <div className='form'>
          <div className="right">
              <label htmlFor="test">نوع المنتجات</label>
              <input type="text" placeholder="" value={items.titleProduce} onChange={(e)=>setItems({...items, titleProduce: e.target.value})} />
              <label htmlFor="sort"> المنتجات</label>
              <select onChange={(e)=>setItems({...items, sort: e.target.value})}   name="sort" id="sort">
                  <option value="">أضافة طريقة الشحن</option>
                  <option value="bayid">بالأيدي</option>
                  <option value="bayaccount">بالحساب</option>
                  <option value="cards">بالبطاقات</option>
                  <option value="stock">شراء رصيد</option>
                  <option value="selling">بيع رصيد</option>
              </select>
              <label htmlFor="test">منتجات</label>  
              <div className='cart'>
                <input type="text" name='item' onChange={handlCart} value={cart?.item} placeholder="منتج" />
                <input type="text" name='price' onChange={handlCart} value={cart?.price} placeholder="سعر المنتج" />
              {/* {cart?.item ? (
                <button onClick={()=>updateItme()}>تحديث</button>
                ):( */}
                  <button onClick={()=>addCart()}>أضافة</button>
              {/* )} */}
              </div>
              <ul>
                {items.cart.map((e,i)=>(
                  <li key={i}> 
                    {/* <span onClick={()=>console.log(e)}>{e.item}</span> */}
                    <span onClick={()=>setCart(e)}>{e.item}</span>
                    <span>{e.price}</span>
                    <span onClick={()=>changeCart(e)}>{e.font ? "true": "false"}</span>
                    <span onClick={()=>deleteCart(e.item)}>X</span>
                  </li>
                ))}
                <button onClick={()=>addItems()}>أضافة</button>
              </ul>
            </div>
            <div className="left">
              <div className='addImg'>
                <label htmlFor="addimg">صور للمنتج</label>
                <ArchiveIcon onClick={()=> imgbay.current.click()}/>
                <input id='addimg' type="file" ref={imgbay} className='file' onChange={e=>gitFileAmage(e.target.files[0])}  />
                <input id='img' type="text"  name="img" onChange={e=>setProduct({...product, img: e.target.value})} />
              </div>

              <label htmlFor="test">عنوان</label>
              <input type="text" value={product.title} placeholder="" name='title' onChange={e=>setProduct({...product, title: e.target.value})}  />
              <label htmlFor="test">تعريف عن المنتج</label>
              <div className='paragraphs'>
                  <textarea name="" id="" value={paragraphs} cols="35" rows="3" onChange={e=>setParagraphs(e.target.value)} placeholder="et"  ></textarea>
                  <div onClick={()=>pp()} className='buttondiv' >pp</div>
              </div>
              <button onClick={()=>addProductToStore()} >أضافة المنتج</button>
              <button onClick={()=>updateProductToStore()} >تحديث المنتج</button>
            </div>
        </div>
        <div className='for-product'>
              <div className='this'>
                <img alt='img' src={product.img || noimg} />
                <div>{product.title}</div>
              </div>
              <div className='setParagraphs'>
                <div>{product.paragraphs} </div><span onClick={()=>setProduct({...product, paragraphs:[]})}>X</span>
              </div>
              <div className='setParagraphsi'>
               {product.items && product.items.map((e,i)=>(
                <div className='box' key={i}>
                  <div className='rew'>
                      <BorderColorIcon onClick={()=>setItems(e)}/>
                      <div className='bl'>
                          <span>{ e.sort}</span>
                          <span>{e.titleProduce}</span>
                      </div>
                    <DeleteForeverIcon onClick={()=>deleteItems(e.titleProduce)} />
                   </div>
                  <div className='rewi'>
                    {e.cart.map((w,t)=>(
                        <div   key={t} className={w.font ? "boxrew" : 'boxrew nonef'}>
                          <span>{w.price}</span>
                          <span>{w.item}</span>
                        </div>
                    ))}
                  </div> 
                </div>
               )) }
              </div>
        </div>
        {showProduct && showProduct.map((sh,ki)=> (
        <div key={ki} className='show-product'>
           <DeleteForeverIcon onClick={()=>dataPorduct(sh._id)} />
              <div className='this'>
                <img alt='aimg' onClick={()=>setProduct(sh)} src={sh.img || noimg} />
                <div>{sh.title}</div>
              </div>
              <div className='setParagraphs'>
                <div>{sh.paragraphs} </div>
              </div>
              <div className='setParagraphsi'>
               {sh.items && sh.items.map((e,i)=>(
                <div className='box' key={i}>
                  <div className='rew'>
                      <div className='bl'>
                          <span>{ e.sort}</span>
                          <span>{e.titleProduce}</span>
                      </div>
                   </div>
                  <div className='rewi'>
                    {e.cart.map((w,t)=>(
                        <div   key={t} className={w.font ? "boxrew" : 'boxrew nonef'}>
                          <span>{w.price}</span>
                          <span>{w.item}</span>
                        </div>
                    ))}
                  </div> 
                </div>
               )) }
              </div>
           </div>
        ) )}
      </div>
   </div>
  )
}

export default Add;