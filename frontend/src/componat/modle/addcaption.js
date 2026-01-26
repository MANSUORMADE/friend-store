import { useState,useEffect } from 'react'
import "./backdrop.scss"
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import newRequest from './../../utils/newRequest.js'
import allimg from './../../assets/img.js'
import Animation from '../animation/animation';

const Addcaption = ({colose,datac}) => {
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding]= useState(false)
    const [data, setData]= useState('')
    console.log(datac)
    useEffect(()=> {
    },[])
    if (!dataUser) return <p>المستخدم غير موجود</p>;
    const  istitle =  data
    const isFormValid = istitle 
    const updatadataUser = async e => {
        e.preventDefault();
        setLoding(true)
          try {
            const res = await newRequest.put(`news/caption/${datac._id}`,{
              id: dataUser.userid,
              name: dataUser.username,
              img: dataUser.img,
              iscaption: data,
            })
            toast.success(res.data)
            setTimeout(()=>{ 
                setLoding(false)
                colose()
               },3000)
            } catch (err) {
              if(err.message === 'Network Error') {
            setLoding(false)
            toast.error("لا يوجد الأتصال بالأنترنت")
          } else {
            setLoding(false)
            toast.error(err.response.data)
          }
        }
        }
  return (
    <div className="backdrop">
      {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
        <div className='boxed'>  
          {datac.caption ? datac.caption.map((e,i)=> (
            <div key={i} className='box-caption'>
            {e.img ? <img src={e.img || allimg.user} /> : <AccountCircleIcon/> }
              <div>
                <span className='name'>{e.name}</span>
                <span className='cap'>{e.iscaption}</span>
              </div>
            </div>
          )): (
            <div className='no'>ليسة هناك اي تعليق</div>
          )}
        </div>
        <div className='colos' onClick={()=>colose()}><LoginIcon /></div>
            <form onSubmit={updatadataUser} className='form'>
                <label htmlFor='title'>أضافة تعليق لي المنشور</label>
                <input id='title' type='text' name="title" placeholder="ضافة تعليق لي المنشور"onChange={e=>setData(e.target.value)} value={data}  />
                <button disabled={!isFormValid} >تعليق</button>
            </form>
        </div>  
  </div>
  )
}

export default Addcaption;