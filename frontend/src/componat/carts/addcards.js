
import { useEffect, useState } from 'react'
import './Carts.scss'
import { ToastContainer, toast } from 'react-toastify';

import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux.js';
import { addToCart } from '../../redux/cartProduc.js';

import noimg from './../../images/noimg.png'
import DiamondIcon from '@mui/icons-material/Diamond';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Animation from '../animation/animation';



const AddCards = () => {
    const {title, item} = useParams()
  const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [ArrayCart, setArrayCart] = useState('')
      const [amount, setAmount] = useState(1)
    

  const {itmes, status} = useSelector((state) => state.itmes); 
  useEffect(()=> {
    if(status === 'idle') {
      dispatch(fetchProducts());
    }
  },[status, dispatch])
  
  const produceed = itmes.find(t=>t.title.replaceAll(" ", "_") === item)
  if(status === "loading") return <Animation />
  if(!produceed) return <>no itmes</>
  const cards = produceed.items.find(i=>i.titleProduce.replaceAll(" ", "_") === title)
  if(!cards) return <>no itmes</>
    const pushData =  () =>{     
      setLoading(true) 
      let dataCart = {
        id: Date.now(),
        img: produceed.img,
        item: ArrayCart.item,
        price: ArrayCart.price,
        pay: ArrayCart.pay,
        amount: amount,
        title:cards.titleProduce,
        sort: produceed.title,
        skills: null,
        items: []
      }
        setArrayCart('')
        setAmount(1)
        dispatch(addToCart(dataCart))
        toast.success("تم أضافة المنتج في العربة")
        setTimeout(()=> { 
          setLoading(false)
        },1000)

      }
  return (
    <div className="add-cart">
      <ToastContainer />
      {loading && <Animation />}
        <img className="logoimg" src={produceed.img ||  noimg} alt="" />
        <h4 >{  `بطاقات ${produceed.title}` }</h4>
         <div className="row">
          {cards.cart && cards.cart.map((e,i)=> (
           <button  onClick={()=>setArrayCart({item:e.item,price:e.price,pay:e.pay})} 
                    key={i}  disabled={!e.font}  
                    className="produce"><DiamondIcon/>{e.item}</button>
         ))}
        </div>
        {ArrayCart &&
            <div  className="getCart">
                <div className="prace">ج.س<span>{Number(ArrayCart.price).toLocaleString()}</span></div>
                <RestoreFromTrashIcon onClick={()=>setArrayCart('')} />
                <div className="addCart">
                    <div onClick={()=>setAmount((e)=>(amount===1?1:e-1))}>-</div>
                    <span>{amount}</span>
                    <div onClick={()=>setAmount((e)=>(amount===10?10:e+1))}>+</div>
                </div>
            </div>
          }
        <button 
        className='add-cart-button' 
        onClick={()=>pushData()} 
        ><AddCircleIcon /> أضافة السلة</button>
    </div>

  )
}

export default AddCards