import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './admin.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import imgsuser from './../../images/noimg.png'; 
import newRequest from '../../utils/newRequest.js'
import UpDateUser from '../../componat/modle/updateuser.js';
import Animation from '../../componat/animation/animation.js';
import { ToastContainer, toast } from 'react-toastify';

const TheUser = () => {
    const { token } = useParams()
    const [loding, setLoding]= useState(false)
    const [colos, setColos ]= useState(false)
    const [num, setNum ]= useState('')
    const [password, setPassword ]= useState('')
    const [message, setMessage ]= useState('')
    const [singleData, setSingleData]= useState()
    const getDataallUser = async ()=> {
      setLoding(true)
      try{
        const res = await newRequest.get(`users/single/${token}`)
        setSingleData(res.data)
        setLoding(false)
      } catch(err) {
        setLoding(false)
        if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
    }
    useEffect(()=> {
      getDataallUser()
    },[])

  const colosed = ()=> {
    setColos(false)
    getDataallUser()
  }

  const updateTestAdmin = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.put(`users/updateTestAdmin/${token}`, {...singleData, testAdmin: !singleData.testAdmin})
      toast.success(res.data)
      setLoding(false)
      getDataallUser()
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
      toast.error(err.response.data)      }
  }
  const updateisSeller = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.put(`users/updateTestAdmin/${token}`, {...singleData, isSeller: !singleData.isSeller})
      toast.success(res.data)
      setLoding(false)
      getDataallUser()
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
      toast.error(err.response.data)      }
  }
  const updateisWorke = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.put(`users/updateTestAdmin/${token}`, {...singleData, isWorke: !singleData.isWorke})
      toast.success(res.data)
      setNum('')
      setLoding(false)
      getDataallUser()
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
      toast.error(err.response.data)      }
  }
  const updateadmin = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.put(`users/updateTestAdmin/${token}`, {...singleData, admin: !singleData.admin})
      toast.success(res.data)
      setLoding(false)
      getDataallUser()
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
      toast.error(err.response.data)      }
  }

  const decrement = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.put(`users/decrement/${token}`, {num: num})
      toast.success(res.data)
      setNum('')
      setLoding(false)
      getDataallUser()
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
        console.log(err)
      toast.error(err.response.data)      }
    }
    const increment = async ()=> {
      setLoding(true)
      try{
        const res = await newRequest.put(`users/increment/${token}`, {num: num})
        getDataallUser()
        toast.success(res.data)
        setNum('')
      setLoding(false)
    } catch(err) {
      setLoding(false)
      getDataallUser()
      if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
      const sund = async ()=> {
        try {
          const res = await newRequest.put(`users/addMessag/${token}`, {message,falet: true})
          console.log(res.data)
          getDataallUser()
        } catch(err) {
            console.log(err)
        }
    }
  
      const newPassaord = async  e => {
        try {
          const res = await newRequest.post(`auth/updatepassword`, {email : singleData.email, password})
          console.log(res.data)
          getDataallUser()
        } catch(err) {
            console.log(err)
        }
    }
  
  
  
  if (!singleData) return <p>المستخدم غير موجود</p>;
  return (
    <div className="single-user-admin">
      {loding && <Animation />}
      <ToastContainer />
      <h1>تفاصل الحساب </h1>
      <div className='accuont-dataUser'>
        {colos && < UpDateUser colose={()=>colosed()} getdatauser={singleData._id}  />  }
          <main><BorderColorIcon onClick={()=>setColos(!colos)}/><img  onClick={e=>e.target.classList.toggle("bik")} src={singleData.img || imgsuser} alt="img" /></main>   
          <main><span>الأسم</span><span>{singleData.username}</span></main>   
          <main><span>نوع الحساب</span><span>{singleData.isSeller ? "عميل" : "مستخدم"}</span></main>   
          <main><span>الأيدي</span><span>{singleData.userid}</span></main>   
          <main><span>بريد الإلكتروني</span><span>{singleData.email}</span></main>   
          <main><span>رقم الهاتف</span><span>{singleData.phone || "فارغ"}</span></main>     
          <main><span>زمن التسجل</span><span>{singleData.createdAt}</span></main>  
          <main><span>الرصيد</span><span>{Number(singleData.money).toLocaleString() || 0}</span></main>
          <main><span>الأدارة العامة</span><div onClick={()=>updateadmin(singleData)} className={`true-false ${singleData.admin ? "true": "false"}`}></div></main>
          <main><span>الحال الحساب</span><div onClick={()=>updateisWorke(singleData)} className={`true-false ${singleData.isWorke ? "true": "false"}`}></div></main>
          <main><span>اداري</span><div onClick={()=>updateisSeller(singleData)} className={`true-false ${singleData.isSeller ? "true": "false"}`}></div></main>
          <main><span>عميل في موقع</span><div onClick={()=>updateTestAdmin(singleData)} className={`true-false ${singleData.testAdmin ? "true": "false"}`}></div></main>
          <div className='form-user-money'>
            <input type='number' placeholder='رصيد' value={num} onChange={e=>setNum(e.target.value)} />
            <button onClick={increment}>أضافة</button>
            <button onClick={decrement}>سحب</button>
          </div>
          <div>{singleData.message.message}</div>
          <div className='form-user-money'>
            <input placeholder='رسالة لي المستخدم' type='text' value={message} onChange={e=>setMessage(e.target.value)} />
            <button onClick={sund}>ارسال</button>
          </div>
          <div className='form-user-money'>
            <input type='text' placeholder='كلمة المرور' value={password} onChange={e=>setPassword(e.target.value)} />
            <button onClick={()=>newPassaord(singleData._idd)}>new password</button>
          </div>
     </div>
  </div>
  )
}

export default TheUser;