
import { useEffect,  useState } from 'react'
import './Carts.scss'
import { ToastContainer, toast } from 'react-toastify';
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux.js';
import { addToCart } from '../../redux/cartProduc.js';
import freefire from './../../images/noimg.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Animation from '../animation/animation';



const AddStock = () => {
  const {title, item} = useParams()
  const dispatch = useDispatch()
      const [arrayCart, setArrayCart] = useState('')
      const [amount, setAmount] = useState(1)
      const [loading, setLoading] = useState(false)

  const {itmes, status} = useSelector((state) => state.itmes); 
    const [inputCart, setInputCart] = useState({nameAccunt: "",  numberAccount:"", cats: "رصيد"})
  
  useEffect(()=> {
    if(status === 'idle') {
      dispatch(fetchProducts());
    }
  },[status, dispatch])
    if(status === "loading") return <Animation />
    if(!itmes) return <>no cart</>
    const produce = itmes.find(c=>c.title.replaceAll(" ", "_") === item)
    if(!produce) return <>no cart</>
    const bayaccount = produce.items.find(c=>c.titleProduce.replaceAll(" ", "_") === title)
    if(!bayaccount) return <>no cart</>
    if(!produce) return <div>the produce and default</div>

  const handleChangeAccount = (e) =>  setInputCart((prev)=>{  return {...prev, [e.target.name]: e.target.value}})

  const isNumberAccount =inputCart.numberAccount
  const isNameAccunt = inputCart.nameAccunt
  const isFormValid = isNameAccunt && isNumberAccount  && +amount > 0 

  const pushData =  () =>{    
    setLoading(true)  
    let dataCart = {
        id: Date.now(),
          img: produce.img,
          item: arrayCart.item,
          price: arrayCart.price,
          title: bayaccount.titleProduce ,
          amount: amount,
          sort:  produce.title,
          skills: inputCart,
          items: []
            }
            console.log(dataCart)
            setInputCart({nameAccunt: "",  numberAccount:"", cats: ""})
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
        <img className="logoimg" src={produce.img ||  freefire} alt="" />
        <h4>{bayaccount.titleProduce}</h4>
                  <div className="row">
                {bayaccount.cart && bayaccount.cart.map((e,i)=> (
                <button  onClick={()=>setArrayCart({item:e.item,price:e.price,pay:e.pay})} 
                      key={i} disabled={!e.font}  
                      className="produce">{e.item}</button>
                ))}
          </div>
          {arrayCart &&
          <div className='baycart'>
            <div className='pricee'>
                <span>{arrayCart.item}</span>
                <input  type="number"  min={1}  name="amount"  value={amount} 
                    onChange={(e)=>setAmount(e.target.value)} />
            </div>
            <span>س.ج{Number(+bayaccount.cart[0].price * +amount).toLocaleString()}</span>
          </div>
          }
          <div className='accuont'>
            <input type="text" required onChange={handleChangeAccount} value={inputCart.numberAccount} name="numberAccount" placeholder="رقم او البريد" />
            <input type="text" required onChange={handleChangeAccount} value={inputCart.nameAccunt} name="nameAccunt"placeholder="الاسم "  />
          </div>
        <button 
        disabled={!isFormValid} 
        className='add-cart-button' 
        onClick={()=>pushData()} 
        ><AddCircleIcon /> أضافة السلة</button>
    </div>

  )
}

export default AddStock