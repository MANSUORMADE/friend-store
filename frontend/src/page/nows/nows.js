import  { useEffect,  useState } from 'react'
import './nows.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import newRequest from '../../utils/newRequest.js';
import newimg from './../../images/mystor.png'
import { ToastContainer, toast } from 'react-toastify';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import ForumIcon from '@mui/icons-material/Forum';
import AddNews from '../../componat/modle/addNews.js';
import Addcaption from '../../componat/modle/addcaption.js';
import Animation from '../../componat/animation/animation.js';
import { Link } from 'react-router-dom';
const Nows = () => {
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const [pubishes, setPubishes]= useState([
    {
      _id: 234,
      username: "Friend Store",
      userImg: "",
      title: "حداث عن موقع الأصدقاء",
      placed: "يمكنك نشر الأحداث لي يفيد الجميع",
      link: [],
      caption: [],
      createdAt: `${new Date().getFullYear}/01/01`,
      userid: 234,
    }
  ])
  const [closecap, setClosecap]= useState(false)
  const [closeadd, setCloseadd]= useState(false)
  const [oneCaption, setOneCaption]= useState('')
    const [loding, setLoding]= useState(false)    

  const getDataNews = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.get('news')
      setPubishes(res.data)
      setLoding(false)
    } catch(err) {
     setLoding(false)
    if(err.message === "Network Error") return toast.error(err.message)
      toast.error(err.response.data)
     }
  }
  useEffect(()=>{
    getDataNews()
  },[])
  
  const removePubishe = async id => {
      if(!dataUser) return toast.error("عليك بي تسجيل دخول")
    setLoding(true)
    try {
      const res = await newRequest.delete(`news/${id}`)
          toast.success(res.data)
        getDataNews()
          setLoding(false)
        } catch (err) {
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
  }
  const fnucl = async () => { 
    setCloseadd(false)
    setClosecap(false)
     getDataNews()
  }
    const addLinked = async id  => {
      if(!dataUser) return toast.error("عليك بي تسجيل دخول")
        setLoding(true)
      try {
        const res = await newRequest.put(`news/link/${id}`,{userid:dataUser.userid})
        toast.success(res.data)
        getDataNews()
            setTimeout(()=>{ 
              setLoding(false)
            },3000)
          } catch (err) {
            setLoding(false)
            if(err.message === "Network Error") return toast.error(err.message)
              toast.error(err.response.data)
          }
        }
        const addCap = e => {
    if(!dataUser) return toast.error("عليك بي تسجيل دخول")
        setOneCaption(e)
        setClosecap(true)
      }
  return (
    <div className="nows">
        <div className="container">
        <ToastContainer/>
          {closeadd  && <AddNews colose={fnucl}/> }
          {loding &&  <Animation/> }
            <button onClick={()=>dataUser && setCloseadd(true)}>نشر الأحداث</button>
          {pubishes ?  pubishes?.slice().reverse().map((e,i)=> (
            <div key={i} className='boxing'>
              <div className='data-user'>
                {e?.userImg ? <img src={e?.userImg} alt='user'/> : <AccountCircleIcon/>}
                <div className='data'>
                  <span className='name'>{e?.username}</span>
                  <span className='date'>{e?.createdAt }</span>
                </div>
                {dataUser?.isSeller ?  (
                  <div onClick={()=>removePubishe(e?._id)} className='remove'>x</div>
                ): +e?.userid === +dataUser?.userid ? (
                  <div onClick={()=>removePubishe(e?._id)} className='remove'>x</div>
                ) :(
                  null
                )}
              </div>
              <div className='data-pubishe'>
                <h4>{e?.title}</h4>
                <p>{e?.placed}</p>
                <div className='images'>
                  <img src={e?.img || newimg} alt='pubishe'/>
                </div>
              </div>
              <div className='data-caption'>
                <div  className='data d1'>
                  <span>{e?.link.length}</span>
                  <span>{e?.caption.length}</span>
                </div>
                <div className='data d2'>
                  {e?.link.find(e=>+e === +dataUser?.userid) ?  (
                   <span className='spaned linked'><ThumbUpOffAltIcon/>أعجبني</span>
                  ): (
                    <span onClick={()=>addLinked(e._id)}><ThumbUpOffAltIcon/>أعجبنيي</span>
                  )}
                  <span onClick={()=>addCap(e)}><ForumIcon/>تعليق</span>
                </div>
              </div>
            </div>
          )):  (
            <div className='no'>ليسة هناك اي الأحداث</div>
          )}
          {closecap && <Addcaption datac={oneCaption} colose={()=>fnucl()} /> }
        </div>
    </div>
  )
}

export default Nows;