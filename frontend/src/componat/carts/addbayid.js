
import { useEffect, useState } from 'react'
import './Carts.scss'
import {  useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux.js';
import { addToCart } from '../../redux/cartProduc.js';
import freefire from './../../images/noimg.png'
import DiamondIcon from '@mui/icons-material/Diamond';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Animation from '../animation/animation';



const AddBayId = () => {
    const Navigate = useNavigate()
  const {title, item} = useParams()
  const dispatch = useDispatch()
    const [ArrayCart, setArrayCart] = useState('')
    const [loading, setLoading] = useState(false)
      const [amount, setAmount] = useState(1)

  const {itmes, status} = useSelector((state) => state.itmes); 
    const [inputCart, setInputCart] = useState({nameAccunt: "",  numberAccount:"", cats: "رصيد"})
  
  useEffect(()=> {
    if(status === 'idle') {
      dispatch(fetchProducts());
    }
  },[status, dispatch])
    if(status === "loading") return <div></div>
    if(!itmes) return <>no cart</>
    const produce = itmes.find(c=>c.title.replaceAll(" ", "_") === item)
    if(!produce) return <>no cart</>
    const bayaccount = produce.items.find(c=>c.titleProduce.replaceAll(" ", "_") === title)
    if(!bayaccount) return <>no cart</>
    console.log(bayaccount)
    if(!produce) return <div>the produce and default</div>
  
  const handleChangeAccount = (e) =>  setInputCart((prev)=>{  return {...prev, [e.target.name]: e.target.value}})
  const pushData =  now =>{     
    setLoading(true) 
    let dataCart = {
        id: Date.now(),
           img: produce.img,
          item: ArrayCart.item,
          price: ArrayCart.price,
          bay: ArrayCart.bay,
          amount: amount,
          title: bayaccount.titleProduce,
          sort: produce.title,
          skills: inputCart,
          items: []
            }
            console.log(dataCart)
            setArrayCart('')
            setInputCart({nameAccunt: "",  numberAccount:"", cats: ""})
            setAmount(1)
        dispatch(addToCart(dataCart))
        toast.success("تم أضافة المنتج في العربة")
        setTimeout(()=> { 
          setLoading(false)
            if(now) {
            Navigate("/Orders")
          }
        },1000)

      }
  return (
    <div className="add-cart">
      <ToastContainer />
      {loading && <Animation />}
        <img className="logoimg" src={produce.img ||  freefire} alt="" />
        <h4 >{bayaccount.titleProduce}</h4>
        <div className="row">
          {bayaccount.cart && bayaccount.cart.map((e,i)=> (
           <button  onClick={()=>setArrayCart({item:e.item,price:e.price,pay:e.pay})} 
                    key={i} disabled={!e.font}  
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
          <div className='accuont'>
                <input type="text" required onChange={handleChangeAccount} value={inputCart.numberAccount} name="numberAccount" placeholder="الأيدي او رقم التسلسول" />
                <input type="text" required onChange={handleChangeAccount} value={inputCart.nameAccunt} name="nameAccunt"placeholder="الاسم "  />
              </div>
            <div className='tow'>
              <button 
        disabled={!ArrayCart || !inputCart.numberAccount} 
              className='add-cart-button' 
              onClick={()=>pushData()} 
              ><AddCircleIcon /> أضافة السلة</button>
              <button 
        disabled={!ArrayCart || !inputCart.numberAccount} 
              className='add-cart-button now' 
              
              onClick={()=>pushData("now")} 
              ><AddCircleIcon />شراء الأن</button>
          </div>
    </div>

  )
}

export default AddBayId