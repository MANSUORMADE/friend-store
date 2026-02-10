import { useEffect, useState } from 'react'
import './Home.scss'
import { data, Link } from 'react-router-dom'
import getimgin from "../../images/noimg.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './../../redux/itmesRedux.js';
import Animation from '../../componat/animation/animation';
import TestBox from '../../componat/testBox/testBox.js';
import HeaderBox from '../../componat/headerBox/HeaderBox.js';
import MessageUser from '../../componat/messageUser/messageUser.js';
import uploadUser from '../../utils/update.js';

const Home = () => {
  const dispatch = useDispatch()
  const dataUser = JSON.parse(window.localStorage.getItem("dataFriend"))
  const {itmes, status} = useSelector((state) => state.itmes); 
  const [open,setOpen] = useState(false)

  useEffect(()=> {
    if(status === 'idle') {
      dispatch(fetchProducts());
    }
    if(dataUser?.message) {
      if(dataUser?.message?.falet) {
        setOpen(true)
      }
    }
  },[status, dispatch])

  if(status === "loading") {
    
    return (
      <>
        <TestBox/>
        <Animation/>
      </>
    )
  }
  const close =()=> {
    setOpen(false)
    window.localStorage.setItem("dataFriend", JSON.stringify({...dataUser,message: {...dataUser.message,falet: false,}}))
  }

  if(!itmes) return <TestBox/>
  return (
    <div className="my-info">
       <div className="container">
         <HeaderBox/>
         {open &&  (
            <div className="backdrop">
                <div className="outsunupmony">
                    <MessageUser close={close} />
                </div>
            </div>
       )}
          <h3>جميع المعاملات في مكان واحد تحويلات والبطاقات و الرصيد و العاب</h3>
        <div className='rew'>
          {itmes && itmes.map((have, index) => (
            <div className="box" key={index}>
              <Link to={`/home/product/${have.title.replaceAll(" ", "_")}`}>
                <img src={have.img || getimgin} alt="tag" />
                <div>{have.title}</div>
              </Link>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home