import React, { useRef, useState,useEffect } from 'react'
import "./backdrop.scss"
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import newRequest from './../../utils/newRequest.js'
import Animation from '../animation/animation';
import uploadUser from '../../utils/update';

const UpDateUser = ({colose, getdatauser}) => {
    const [status, setstatus]= useState(true)
    const [singleData, setSingleData]= useState()
    const [loding, setLoding]= useState(false)
    const [addmoney, setAddmoney]= useState(0)
    const getDataallUser = async ()=> {
      setLoding(true)
      try{
        const res = await newRequest.get(`users/single/${getdatauser}`)
        setstatus(false)
        console.log(res.data)
        setSingleData(res.data)
        setLoding(false)
      } catch(err) {
         setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
    }
    useEffect(()=> {  
      getDataallUser()
    },[status])
    if (status) return  <Animation />;
    if (!singleData) return <p>المستخدم غير موجود</p>;
    const handldataUser = (e)=> setSingleData( pre =>{ return {...pre, [e.target.name]: e.target.value} }) 
    const isEmail = /^[a-z0-9]+@+gmail+.+com+$/.test(singleData.email)
    const isFormValid = isEmail
    // setLoding(true)
    const updatadataUser = async e => {
      e.preventDefault();
      setLoding(true)
      try {
        const res = await newRequest.put(`users/update/${getdatauser}`, {...singleData, money : +singleData.money + +addmoney})
        toast.success(res.data)
        setTimeout(()=> {
          uploadUser()
          setLoding(false)
          colose()
        },3000)
      } catch (err) {
        if(err.message === 'Network Error') {
          toast.error("لا يوجد الأتصال بالأنترنت")
          setLoding(false)
        } else {
          toast.error(err.response.data)
          setLoding(false)
        }
        }
        }
  return (
    <div className="backdrop">
       {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
        <div className='colos' onClick={()=>colose()}><LoginIcon /></div>
            <form onSubmit={updatadataUser} className='form'>
                <label htmlFor='usrrname'>الأسم</label>
                <input id='username' type='text'  onChange={handldataUser} name="username" placeholder='' value={singleData.username} />
                <label htmlFor='email'>البريد الالكتروني</label>
                <input id='email' type='text' onChange={handldataUser} name="email" placeholder='' value={singleData.email} />
                <label htmlFor='phone'>رقم الهاتف</label>
                <input id='phone' type='text' onChange={handldataUser} name="phone" placeholder='' value={singleData.phone} />
                <div className='addmoney'>
                  <div>
                    <label htmlFor='money'>رصيد الحالي</label>
                    <input id='money' type='number' onChange={handldataUser} name="money" placeholder='' value={singleData.money} />
                  </div>
                  <div>
                    <label htmlFor='addmoney'>أضافة رصيد</label>
                    <input id='addmoney' type='addnumber' onChange={e=>setAddmoney(e.target.value)} name="addmoney" placeholder='' value={addmoney} />
                  </div>
                </div>
                <div className='chann'>
                  <h3>{singleData.isWorke ? "يعمل" : 'موقف'}<span onClick={()=>setSingleData({...singleData,isWorke : !singleData.isWorke})}>pp</span></h3>
                  <h3>{singleData.isSeller ? "عميل" : 'مستخدم'}<span onClick={()=>setSingleData({...singleData,isSeller : !singleData.isSeller})}>pp</span></h3>
                </div>
               <button disabled={!isFormValid} >تحديث المستخدم</button>
            </form> 
        </div>  
  </div>
  )
}

export default UpDateUser;