import { useEffect } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import getimgin from "../../images/noimg.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './../../redux/itmesRedux.js';
import Animation from '../../componat/animation/animation';
import TestBox from '../../componat/testBox/testBox.js';
import HeaderBox from '../../componat/headerBox/HeaderBox.js';

const Home = () => {
  const dispatch = useDispatch()
  const {itmes, status} = useSelector((state) => state.itmes); 

  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fetchProducts());
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

  if(!itmes) return <TestBox/>
  return (
    <div className="my-info">
       <div className="container">
         <HeaderBox/>
          <h3>جميع البطاقات و الرصيد و العاب</h3>
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