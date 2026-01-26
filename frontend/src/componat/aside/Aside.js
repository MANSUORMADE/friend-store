import React, { useRef } from 'react';
import './Aside.scss'
import { Link } from "react-router-dom"
import noimg from '../../images/noimg.png'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector,useDispatch } from 'react-redux'
import { removeItem, increment,decrement } from '../../redux/cartProduc';

const Aside = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)

  const targeted = useRef()
  if(!products) return <div>جاري</div>


  const openAside = () =>  targeted.current.classList.toggle('open')

  
const totalPrice = () => {
  let total = 0;
  products.forEach((i)=>( 
    total += i.amount * i.price
  ));
  return total.toFixed(2);
}
  return (
    <div className="aside" ref={targeted}>
      <div className='targetAsede'> 
        <span>{products.length}</span>
        <AddShoppingCartIcon onClick={openAside} />
      </div>
      <div className="containder">
          <div className="top">
            <div className="remoed" onClick={openAside}><ArrowBackIcon /> إغلاق</div>
            <h3>عربة التسوق</h3>
        </div>
        {products.length>0 ? (
          <>
            <ul className="cart"> 
              {products.map((cart,i)=> (
                <li key={i} >
                  <img src={cart.img || noimg} alt="tarta" />
                  <div className="rew">
                    <div className="top">
                      <span className="title">{cart.title}</span>
                      <span className="itmes">{cart.item} </span>
                    </div>
                    <div className="price-amount">
                      <div className="price">
                          <span className="">ج.س.</span>
                          <span className="pr">{Number(cart.price).toLocaleString()}</span>
                      </div>
                      <div className="amount">
                          <button onClick={()=> dispatch(decrement(cart.id))} >-</button>
                          <span className="am">{cart.amount}</span>
                          <button onClick={()=> dispatch(increment(cart.id))} >+</button>
                      </div>
                    </div>
                  </div>
                  <DeleteForeverIcon onClick={()=> dispatch(removeItem(cart.id))} />
                </li>
              ))}
            </ul>
            <div className="bottom">
              <div className="allpries">
                  <h2>المجموع</h2>
                  <div className="thepries">
                      <span className="price">{ Number(totalPrice()).toLocaleString() }</span>
                      <span>س.ج.</span>
                  </div>
              </div>
              <Link onClick={openAside} className="submit" to="/Orders">
                  <button>أتمام الطلب</button>
              </Link>
          </div>
          </>
        ) : (
            <h1 className="nofountf">لا يوجد طلبات في العربة</h1>
        )}
      </div>
    </div>
  )
}

export default Aside;