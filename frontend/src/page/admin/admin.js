import React, { useEffect, useState } from 'react';
import './admin.scss'
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import Animation from '../../componat/animation/animation';
import newRequest from '../../utils/newRequest';
import Notfound from '../../componat/notfound/notfound';
import { toast } from 'react-toastify';
const Admin = () => {
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))

  const [loding, setLoding]= useState(false)
  const [admine, setAdmine]= useState(false)
  const admined = async ()=> {
    setLoding(true)
    if(dataUser.isSeller) {
      try {
        const res = await newRequest.get(`auth/admin/${dataUser._id}`)
        setAdmine(res.data)
        setLoding(false)
      } catch (err){
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
          }
    }
    }
  useEffect(()=> {
    if(dataUser)  admined()
  },[])

  if(!dataUser) return <Link className='no-data' to="/login">تسجيل دخول</Link>
  if(!dataUser.isSeller) return <Notfound/>
  if(!admine) return <Notfound/>
  return (
    <div className="admin">
      {loding && <Animation />}
       {dataUser ? (
        <div className="container">
           <div className="link-admin">
               <Link to="/admin/add-products">أضافة المنتحات</Link>
               <Link to="/admin/orders">الطلبات</Link>
               <Link to="/admin/users">المستخدمين</Link>
               <Link to="/admin/discount">قسيمة</Link>
               <Link to="/admin/images">كل الصور</Link>
               <Link to="/admin/dealings">كل المعاملات</Link>
               <Link to="/admin/messages"> مراسلة</Link>
           </div>
          <Outlet />
        </div>
         ): (
            <Link className='loginc' to="/login">تسجيل دخول</Link>
        )}
  </div>
  )
}

export default Admin;