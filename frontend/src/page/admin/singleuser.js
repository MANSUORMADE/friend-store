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
      const res = await newRequest.put(`users/updateTestAdmin/${token}`, {update: !singleData.updateTestAdmin})
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
          <main><span>الحال</span><span>{singleData.isWorke ? "شغال" : "متوقف"}</span></main>
          <div className='form-user-money'>
            <input type='number' value={num} onChange={e=>setNum(e.target.value)} />
            <button onClick={increment}>أضافة</button>{console.log(singleData)}
            <button onClick={decrement}>سحب</button>
          </div>
          <button onClick={()=>updateTestAdmin(singleData._id)} >{singleData.testAdmin ? "ألغاء" : "عميل في موقع"}</button>
     </div>
  </div>
  )
}

export default TheUser;